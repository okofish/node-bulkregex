rm test1000000 benchmark.json benchmark.txt 2> /dev/null

echo "[{
  \"from\": \"89\",
  \"to\": \"90\"
},{
  \"from\": \"78\",
  \"to\": \"89\"
},{
  \"from\": \"67\",
  \"to\": \"78\"
},{
  \"from\": \"56\",
  \"to\": \"67\"
},{
  \"from\": \"45\",
  \"to\": \"56\"
},{
  \"from\": \"34\",
  \"to\": \"45\"
},{
  \"from\": \"23\",
  \"to\": \"34\"
},{
  \"from\": \"12\",
  \"to\": \"23\"
},{
  \"from\": \"01\",
  \"to\": \"12\"
}]" > benchmark.json

seq 0 1000000 > test1000000 # this is 6.6MB

time node replace.js benchmark.json -i test1000000 -o benchmark.txt
