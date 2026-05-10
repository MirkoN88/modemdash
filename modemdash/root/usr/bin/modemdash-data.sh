#!/bin/sh
echo "Content-Type: application/json"
echo ""

DEV="/dev/ttyUSB3"

send_at() {
    echo -e "$1\r" > "$DEV"
    sleep 0.25
    cat "$DEV" 2>/dev/null | tr -d '\r'
}

OUT=$(send_at 'AT+QENG="servingcell"')

LTE_LINE=$(echo "$OUT" | grep '+QENG: "LTE"' | head -n1)

CELLID=$(echo "$LTE_LINE" | awk -F',' '{print $5}')
PCI=$(echo "$LTE_LINE"    | awk -F',' '{print $6}')
EARFCN=$(echo "$LTE_LINE" | awk -F',' '{print $7}')
BAND=$(echo "$LTE_LINE"   | awk -F',' '{print $8}')
TAC=$(echo "$LTE_LINE"    | awk -F',' '{print $11}')
RSRP=$(echo "$LTE_LINE"   | awk -F',' '{print $12}')
RSRQ=$(echo "$LTE_LINE"   | awk -F',' '{print $13}')
SINR=$(echo "$LTE_LINE"   | awk -F',' '{print $15}')

NEI=$(send_at 'AT+QENG="neighbourcell"')
CA_COUNT=$(echo "$NEI" | grep '+QENG:' | wc -l)

echo "{"
echo "\"tech\":\"LTE\","
echo "\"cellid\":\"$CELLID\","
echo "\"pci\":\"$PCI\","
echo "\"earfcn\":\"$EARFCN\","
echo "\"band\":\"$BAND\","
echo "\"tac\":\"$TAC\","
echo "\"rsrp\":\"$RSRP\","
echo "\"rsrq\":\"$RSRQ\","
echo "\"sinr\":\"$SINR\","
echo "\"ca_count\":\"$CA_COUNT\""
echo "}"
