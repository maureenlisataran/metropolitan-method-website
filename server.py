import http.server, socketserver, os
os.chdir('/Users/maureentaran/Desktop/metropolitan-method-website')
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(('', 3000), handler) as httpd:
    httpd.serve_forever()
