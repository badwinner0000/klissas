import re,sys
for p in sys.argv[1:]:
  s=open(p).read()
  for m in re.finditer(r'(\w+):`',s):
    i=m.end(); j=i; depth=0
    # find closing backtick not inside ${}
    while j<len(s):
      if s[j]=='$' and s[j+1]=='{': depth+=1; j+=2; continue
      if s[j]=='}' and depth: depth-=1
      if s[j]=='`' and not depth: break
      j+=1
    if '${' in s[i:j]:
      print(p, s[:i].count('\n')+1, m.group(1))
