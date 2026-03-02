import http.server, socketserver, os, sys
os.chdir('/Users/gregvandijk/Documents/GitHub/Synitier')
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", port), handler) as httpd:
    print(f"Serving on http://localhost:{port}")
    httpd.serve_forever()
