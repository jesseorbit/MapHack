"""
KR 종목 실시간 가격 가져오기 (Yahoo Finance)
회사명 → KRX 티커 매핑 후 가격 조회
"""
import json, urllib.request, urllib.parse, time

with open("src/lib/kr-politicians-data.json") as f:
    kr_data = json.load(f)

unique_names = set()
for mp in kr_data:
    for s in mp["stocks"]:
        unique_names.add(s["company_name"])

print(f"Total unique stocks: {len(unique_names)}")

us_stock_map = {
    "테슬라": "TSLA", "애플": "AAPL", "엔비디아": "NVDA", "마이크로소프트": "MSFT",
    "아마존닷컴": "AMZN", "팔란티어테크": "PLTR", "브로드컴": "AVGO", "메타플랫폼스": "META",
    "메타": "META", "오라클": "ORCL", "알파벳C": "GOOG", "알파벳A": "GOOGL",
    "토스트": "TOST", "코카콜라": "KO", "골드만삭스": "GS", "IBM": "IBM",
    "셀레스티카": "CLS", "앱플로빈": "APP", "고대디": "GDDY", "세일스포스": "CRM",
    "아이온큐": "IONQ", "조비에비에이션": "JOBY", "아처에비에이션": "ACHR",
    "스포티파이테크놀로지": "SPOT", "델테크놀로지스": "DELL", "버크셔해서웨이B": "BRK-B",
    "데이터도그": "DDOG", "포티넷": "FTNT", "로블록스": "RBLX", "쇼피파이": "SHOP",
    "트레이드데스크": "TTD", "서비스나우": "NOW", "몽고DB": "MDB", "스노우플레이크": "SNOW",
    "어도비": "ADBE", "우버테크놀로지스": "UBER", "프록터앤드갬블": "PG",
    "루시드그룹": "LCID", "카니발": "CCL", "다우": "DOW", "스타벅스": "SBUX",
    "시스코시스템즈": "CSCO", "웨스턴유니온": "WU", "노바백스": "NVAX",
    "온홀딩": "ONON", "GE베르노바": "GEV", "메타플랫폼스(페이스북)": "META",
    "메타플랫폼스(페이스": "META", "유니티소프트웨어": "U",
}

def search_ticker(name):
    try:
        url = f"https://query1.finance.yahoo.com/v1/finance/search?q={urllib.parse.quote(name)}&quotesCount=3&newsCount=0&region=KR&lang=ko-KR"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
            for q in data.get("quotes", []):
                sym = q.get("symbol", "")
                if sym.endswith(".KS") or sym.endswith(".KQ"):
                    return sym
    except:
        pass
    return None

def get_quote(symbol):
    try:
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{urllib.parse.quote(symbol)}?interval=1d&range=1d"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode())
            meta = data.get("chart", {}).get("result", [{}])[0].get("meta", {})
            price = meta.get("regularMarketPrice", 0)
            prev = meta.get("chartPreviousClose", 0) or meta.get("previousClose", 0)
            if price and prev:
                return {"price": price, "changePct": round((price - prev) / prev * 100, 2)}
    except:
        pass
    return None

prices = {}
found = 0
skipped = 0
skip_kw = ["(주)", "주식회사", "스팩", "농업회사", "Fyltech", "코이스라", "웰마커",
           "티엠엑", "레이아이", "인피니툼", "퍼스트버추", "피티엘엠", "KOTC_", "[", "리츠"]

for i, name in enumerate(sorted(unique_names)):
    if any(kw in name for kw in skip_kw):
        skipped += 1
        continue

    if name in us_stock_map:
        q = get_quote(us_stock_map[name])
        if q:
            prices[name] = {"price": round(q["price"] * 1500), "changePct": q["changePct"]}
            found += 1
            print(f"[{found}] {name} -> ${q['price']:.2f} ({q['changePct']:+.2f}%)")
        time.sleep(0.2)
        continue

    ticker = search_ticker(name)
    if ticker:
        q = get_quote(ticker)
        if q:
            prices[name] = {"price": q["price"], "changePct": q["changePct"]}
            found += 1
            print(f"[{found}] {name} -> {ticker}: {q['price']:,.0f}원 ({q['changePct']:+.2f}%)")
        time.sleep(0.3)
        continue

    skipped += 1
    time.sleep(0.15)

print(f"\nDone! Found {found}, skipped {skipped}")
with open("src/lib/kr-prices.json", "w") as f:
    json.dump(prices, f, ensure_ascii=False)
print(f"Saved kr-prices.json ({len(prices)} entries)")
