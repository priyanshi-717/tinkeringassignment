import time
import subprocess
from timer import Timer
timer=Timer()
timer.start()
print("Start coding below (press ENTER twice to finish):\n")

# Start time
start_time = time.time()

# Take code input
lines = []
while True:
    line = input()
    if line == "":
        break
    lines.append(line)

end_time = time.time()

code = "\n".join(lines)

# Save user code
with open("user_code.py", "w") as f:
    f.write(code)

# Take input for the program
print("\nEnter input for your program (press ENTER twice to finish):")
end_time = time.time()
timer.stop()
inputs = []
while True:
    line = input()
    if line == "":
        break
    inputs.append(line)

input_data = "\n".join(inputs)

# Run code with input
print("\nRunning your code...\n")

try:
    output = subprocess.check_output(
        ["python", "user_code.py"],
        input=input_data.encode()
    )
    output = output.decode()
    print(output)
except Exception as e:
    print("Error:", e)
    output = ""

# Time calculation
time_taken = end_time - start_time

# Word count
words = len(code.split())

if output.strip() == "hello":
    print("✅ Correct Answer")
else:
    print("❌ Wrong Answer")
# WPM calculation
wpm = (words / time_taken) * 60 if time_taken > 0 else 0
print("wpm",wpm)
print("time taken",time_taken)
