#!/bin/bash
# Demo script: simulates a passing test run for video recording
clear

# Simulate typing the command
echo -e "\033[1;37m$ heydad test\033[0m"
sleep 1.5

echo ""
echo -e "Detected npm project"
echo ""
echo -e "Running: npm test"
echo ""
sleep 1

# Fake test output that looks real
echo -e " \033[1mRUN\033[0m  v3.2.4 /Users/ayudb/projects/my-app"
echo ""
sleep 0.4
echo -e " \033[32m✓\033[0m src/utils/format.test.ts \033[90m(3 tests)\033[0m \033[90m12ms\033[0m"
sleep 0.3
echo -e " \033[32m✓\033[0m src/utils/validate.test.ts \033[90m(5 tests)\033[0m \033[90m8ms\033[0m"
sleep 0.3
echo -e " \033[32m✓\033[0m src/auth/login.test.ts \033[90m(4 tests)\033[0m \033[90m34ms\033[0m"
sleep 0.2

echo ""
echo -e " Test Files  3 passed (3)"
echo -e "      Tests  12 passed (12)"
echo ""
sleep 1

# Pick a random hype line and play audio
IDX=$((RANDOM % 20 + 1))
IDX_PAD=$(printf "%02d" $IDX)

# Read the matching line from hype.ts
LINE=$(sed -n "$((IDX + 1))p" src/lines/hype.ts | sed 's/^  "//;s/",$//')

echo -e "\033[32m  $LINE\033[0m"
afplay "assets/audio/hype/${IDX_PAD}.mp3"
