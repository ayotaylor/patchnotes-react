package com.patchnotes.gateway.controller;

import java.io.IOException;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("debug")
public class DebugController {
    @GetMapping("/debug/network")
    public String checkNetwork() {
        StringBuilder result = new StringBuilder();
        try {
            // Ping test
            Process ping = Runtime.getRuntime().exec("ping -c 4 userservice");
            result.append("Ping result: ").append(new String(ping.getInputStream().readAllBytes())).append("\n");

            // Curl test
            Process curl = Runtime.getRuntime().exec("curl -I http://userservice:8082/actuator/health");
            result.append("Curl result: ").append(new String(curl.getInputStream().readAllBytes())).append("\n");

            // Netcat test
            Process nc = Runtime.getRuntime().exec("nc -zv userservice 8082");
            result.append("Netcat result: ").append(new String(nc.getInputStream().readAllBytes())).append("\n");

        } catch (IOException e) {
            result.append("Error: ").append(e.getMessage());
        }
        return result.toString();
    }
}
