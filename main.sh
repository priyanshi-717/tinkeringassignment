#!/bin/bash

echo "Select Rating:"
echo "1. 800"
echo "2. 900"
echo "3. 1000"

read choice

if [ $choice -eq 1 ]; then
    grep "(800)" questions.txt
elif [ $choice -eq 2 ]; then
    grep "(900)" questions.txt
elif [ $choice -eq 3 ]; then
    grep "(1000)" questions.txt
else
    echo "Invalid choice"
    exit
fi

echo "---------------------------------"
echo "Start solving..."
python solver.py
