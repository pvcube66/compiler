package com.compiler.controller;

import com.compiler.model.JdoodleRequest;
import com.compiler.model.JdoodleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController
@RequestMapping("/api/compiler")
public class CompilerController {

    private static final String JDOODLE_API_URL = "https://api.jdoodle.com/v1/execute";
    private static final String CLIENT_ID = "2df4042d1666eb37d6ac7d33acc7659b"; // Replace with your JDoodle client ID
    private static final String CLIENT_SECRET = "3e9aee019261db9aecbb0aad002efabbea889a2794459b65a5ec610d419415a7"; // Replace with your JDoodle client secret

    @PostMapping("/execute")
    public ResponseEntity<?> executeCode(@RequestBody JdoodleRequest request) {
        try {
            // Set API credentials
            request.setClientId(CLIENT_ID);
            request.setClientSecret(CLIENT_SECRET);

            // Call JDoodle API
            RestTemplate restTemplate = new RestTemplate();
            JdoodleResponse response = restTemplate.postForObject(
                JDOODLE_API_URL,
                request,
                JdoodleResponse.class
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error executing code: " + e.getMessage());
        }
    }
    
    @PostMapping("/compile")
    public ResponseEntity<?> compileJavaCode(@RequestBody String code) {
        try {
            // Create a JDoodle request
            JdoodleRequest request = new JdoodleRequest();
            request.setClientId(CLIENT_ID);
            request.setClientSecret(CLIENT_SECRET);
            request.setLanguage("java");
            request.setVersionIndex("0");
            request.setScript(code);
            
            // Call JDoodle API
            RestTemplate restTemplate = new RestTemplate();
            JdoodleResponse response = restTemplate.postForObject(
                JDOODLE_API_URL,
                request,
                JdoodleResponse.class
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error compiling code: " + e.getMessage());
        }
    }
}