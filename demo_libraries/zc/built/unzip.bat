@echo off
cd /d %~dp0
cd..
echo "delete files...."
cd target & echo "deleting....."
del /q/a/f/s ROOT 1>nul 2>nul
rd /s/q ROOT
mkdir ROOT
copy ROOT.war ROOT
cd ROOT

echo "unZip war"
jar -xf ROOT.war>nul
del ROOT.war
cd WEB-INF
echo "delete lib files"
del /q/a/f/s lib 1>nul 2>nul
rd /s/q lib
cd .. 
cd ..

echo "zip files"
::zip files
"C:\Program Files\7-Zip\7z.exe" a -tzip "ROOT.zip" ROOT>nul

::upload files
echo "upload files"
set bak_webFile=%CD%\ROOT.zip
set bak_date=%date:~0,4%%date:~5,2%%date:~8,2%
set bak_ftpServer=115.29.49.92
set bak_ftpUserName=test
set bak_ftpUserPass=123test
echo:
echo:
echo "uploading....."
echo open %bak_ftpServer% >ftp.up
echo %bak_ftpUserName%>>ftp.up
echo %bak_ftpUserPass%>>ftp.up
echo bin >>ftp.up
echo cd ftp>>ftp.up
echo mput %bak_webFile%>>ftp.up
echo bye >>ftp.up
FTP -s:ftp.up -i >>log-%bak_date%.txt
::del ftp.up /q
echo:
echo:
echo "upload success"