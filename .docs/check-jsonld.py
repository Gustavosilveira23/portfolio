"""Le o JSON-LD de uma URL e confere o que o Rich Results costuma acusar."""
import json
import re
import sys
import urllib.request

TZ = re.compile(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z)$")

for url in sys.argv[1:]:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 jsonld-check"})
    html = urllib.request.urlopen(req).read().decode("utf-8")
    blocks = re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S)
    print(f"\n{url}: {len(blocks)} blocos")
    for raw in blocks:
        data = json.loads(raw)
        items = data.get("@graph", [data]) if isinstance(data, dict) else data
        for it in items:
            t = it.get("@type")
            issues = []
            if t == "TechArticle":
                for k in ("headline", "image", "author", "datePublished", "dateModified"):
                    if not it.get(k):
                        issues.append(f"sem {k}")
                for k in ("datePublished", "dateModified"):
                    if it.get(k) and not TZ.match(it[k]):
                        issues.append(f"{k} sem fuso: {it[k]}")
                if len(it.get("headline", "")) > 110:
                    issues.append("headline > 110")
                print(f"  TechArticle: {it.get('headline')!r} | {it.get('datePublished')} | {issues or 'ok'}")
            elif t == "FAQPage":
                qs = it.get("mainEntity", [])
                bad = [q for q in qs if not q.get("name") or not q.get("acceptedAnswer", {}).get("text")]
                print(f"  FAQPage: {len(qs)} perguntas | {'ok' if not bad else f'{len(bad)} incompletas'}")
            elif t == "BreadcrumbList":
                names = [e.get("name") for e in it.get("itemListElement", [])]
                missing = [e for e in it.get("itemListElement", []) if not e.get("item") and e is not it["itemListElement"][-1]]
                print(f"  BreadcrumbList: {' > '.join(names)} | {'ok' if not missing else 'item sem URL'}")
            else:
                print(f"  {t}")
