<?php
/**
 * Simple Router for Ardent POS API
 */

class Router {
    private $routes = [];
    
    public function get($path, $handler) {
        $this->addRoute('GET', $path, $handler);
    }
    
    public function post($path, $handler) {
        $this->addRoute('POST', $path, $handler);
    }
    
    public function put($path, $handler) {
        $this->addRoute('PUT', $path, $handler);
    }
    
    public function delete($path, $handler) {
        $this->addRoute('DELETE', $path, $handler);
    }
    
    public function addRoute($method, $path, $handler) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler
        ];
    }
    
    public function dispatch() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        foreach ($this->routes as $route) {
            if ($route['method'] === $method) {
                $pattern = $this->pathToRegex($route['path']);
                if (preg_match($pattern, $path, $matches)) {
                    array_shift($matches); // Remove full match
                    return $this->callHandler($route['handler'], $matches);
                }
            }
        }
        
        // Route not found
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
    
    private function pathToRegex($path) {
        $pattern = preg_replace('/\{([^}]+)\}/', '([^/]+)', $path);
        return '#^' . $pattern . '$#';
    }
    
    private function callHandler($handler, $params = []) {
        if (is_array($handler) && count($handler) === 2) {
            $class = $handler[0];
            $method = $handler[1];
            
            $instance = new $class();
            return call_user_func_array([$instance, $method], $params);
        }
        
        throw new Exception('Invalid handler');
    }
}
?>
