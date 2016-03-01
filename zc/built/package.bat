@echo off
cd /d %~dp0
cd..
start /b cmd
echo "go to compile and package....."
mvn -U clean package -DskipTests & echo "complie success!!!!" & cd built & start cmd /c unzip.bat

pause