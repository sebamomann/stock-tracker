#Readme

## Build / Start

```shell
docker build . -t stock-tracker
```

```shell
docker run -d -p 40004:80 stock-tracker
```
um anschließend den Container auf Port 40004 zu starten.


***Es kommt keine Startbenachrichtigung*** 

---

## Hinweis
Valide Aktien ticker Symbols sind unter Anderem
- TSLA
- APPL
- NIO
- NKLA
- TUI1.DE
- LHA.DE

Nicht jeder ticker wird von der API bereitgestellt. Bei einem invaliden Symbol passiert nichts.

Die Anzahl an Anfragen ist auf 250 pro Tag limitiert.
