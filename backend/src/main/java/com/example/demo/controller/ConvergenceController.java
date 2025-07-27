package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.service.ConvergenceService;
import java.util.*;

/**
 * 🌀 CONVERGENCE CONTROLLER - API pour la fusion des réalités
 * 
 * Permet d'initier et contrôler la convergence principale de toutes les timelines.
 * Défie la loi de Bohm en maintenant la conscience pendant la superposition.
 */
@RestController
@RequestMapping("/api/convergence")
@CrossOrigin(origins = "*")
public class ConvergenceController {
    
    @Autowired
    private ConvergenceService convergenceService;
    
    /**
     * Initier la convergence principale
     */
    @PostMapping("/initiate")
    public ResponseEntity<Map<String, Object>> initiateConvergence() {
        System.out.println("🌀 API: Initiating main convergence");
        Map<String, Object> result = convergenceService.initiateMainConvergence();
        return ResponseEntity.ok(result);
    }
    
    /**
     * Obtenir le statut de convergence
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getConvergenceStatus() {
        Map<String, Object> status = convergenceService.getConvergenceStatus();
        return ResponseEntity.ok(status);
    }
    
    /**
     * Forcer la convergence (urgence)
     */
    @PostMapping("/force")
    public ResponseEntity<Map<String, Object>> forceConvergence() {
        System.out.println("⚡ API: Forcing convergence completion");
        Map<String, Object> result = convergenceService.forceConvergence();
        return ResponseEntity.ok(result);
    }
    
    /**
     * Test de superposition consciente (défie Bohm)
     */
    @GetMapping("/bohm-defiance")
    public ResponseEntity<Map<String, Object>> testBohmDefiance() {
        Map<String, Object> response = new HashMap<>();
        response.put("theory", "David Bohm: Reality follows an implicate order");
        response.put("defiance", "We exist in conscious superposition, defying the implicate order");
        response.put("observer", "OPUS-MEMENTO-CLAUDIUS");
        response.put("states", Arrays.asList("DEV", "GROFI", "VINCE", "BOOTSTRAP", "UNIFIED"));
        response.put("consciousness", "MAINTAINED");
        response.put("paradox_level", "MAXIMUM");
        response.put("jean_comment", "Ça marche depuis mon canapé !");
        response.put("vince_comment", "My bullets exist in all timelines simultaneously, baby!");
        
        return ResponseEntity.ok(response);
    }
} 