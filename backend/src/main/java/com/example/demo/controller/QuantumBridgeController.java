package com.example.demo.controller;

import com.example.demo.service.EREqualsEPRService;
import com.example.demo.service.EREqualsEPRService.ERBridge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 🌉 QUANTUM BRIDGE CONTROLLER - API ER=EPR
 * 
 * VINCE: "Mon flingue fait des trous dans l'espace-temps, et c'est scientifique !"
 * JEAN: "Leonard Susskind approuverait depuis son canapé cosmique."
 */
@RestController
@RequestMapping("/api/quantum-bridge")
@CrossOrigin(origins = "*")
public class QuantumBridgeController {
    
    @Autowired
    private EREqualsEPRService erEqualsEPRService;
    
    /**
     * 🌉 Créer un Pont ER=EPR
     */
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createERBridge(@RequestBody Map<String, Object> request) {
        try {
            String entityA = (String) request.get("entityA");
            String entityB = (String) request.get("entityB");
            Map<String, Object> properties = (Map<String, Object>) request.get("properties");
            
            ERBridge bridge = erEqualsEPRService.createERBridge(entityA, entityB, properties);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("bridgeId", bridge.getBridgeId());
            response.put("traversable", bridge.isTraversable());
            response.put("entanglementStrength", bridge.getEntanglementStrength());
            response.put("message", "Pont ER=EPR créé avec succès !");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * 🔫 Tir Quantique de Vince
     */
    @PostMapping("/vince-quantum-shot")
    public ResponseEntity<Map<String, Object>> vinceQuantumShot(@RequestBody Map<String, Object> request) {
        try {
            String shooter = (String) request.get("shooter");
            String target = (String) request.get("target");
            
            ERBridge bridge = erEqualsEPRService.vinceQuantumShot(shooter, target);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("bridgeId", bridge.getBridgeId());
            response.put("message", "BANG QUANTIQUE ! Un trou de ver traversable a été créé !");
            response.put("effect", "Le pistolet de Vince a déchiré l'espace-temps");
            response.put("traversable", true);
            response.put("quantum_signature", "VINCE_45_QUANTUM");
            
            // Easter egg Pulp Fiction
            if (Math.random() > 0.7) {
                response.put("easter_egg", "Say 'what' again! I dare you! I double dare you!");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * 🌀 Traverser un Pont ER
     */
    @PostMapping("/traverse/{bridgeId}")
    public ResponseEntity<Map<String, Object>> traverseBridge(
            @PathVariable String bridgeId,
            @RequestBody Map<String, Object> request) {
        try {
            Object information = request.get("information");
            
            Map<String, Object> result = erEqualsEPRService.traverseERBridge(bridgeId, information);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * 📊 Mesurer la Force d'Intrication
     */
    @GetMapping("/measure/{bridgeId}")
    public ResponseEntity<Map<String, Object>> measureEntanglement(@PathVariable String bridgeId) {
        try {
            double strength = erEqualsEPRService.measureEntanglementStrength(bridgeId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("bridgeId", bridgeId);
            response.put("entanglementStrength", strength);
            response.put("warning", "La mesure a légèrement affecté l'intrication !");
            
            if (strength < 0.3) {
                response.put("alert", "Le pont est instable et pourrait s'effondrer !");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * 🌐 Obtenir le Réseau d'Intrication Global
     */
    @GetMapping("/network")
    public ResponseEntity<Map<String, Object>> getEntanglementNetwork() {
        try {
            Map<String, Object> network = erEqualsEPRService.getEntanglementNetwork();
            
            return ResponseEntity.ok(network);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * 🔮 Prédire les Ponts Futurs
     */
    @GetMapping("/predict/{entity}")
    public ResponseEntity<List<Map<String, Object>>> predictFutureBridges(@PathVariable String entity) {
        try {
            List<Map<String, Object>> predictions = erEqualsEPRService.predictFutureBridges(entity);
            
            return ResponseEntity.ok(predictions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(Map.of(
                "error", e.getMessage()
            )));
        }
    }
    
    /**
     * 🎮 Test Endpoint - Démonstration ER=EPR
     */
    @GetMapping("/demo")
    public ResponseEntity<Map<String, Object>> demonstrateEREqualsEPR() {
        Map<String, Object> demo = new HashMap<>();
        
        demo.put("theory", "ER = EPR (Leonard Susskind, 2013)");
        demo.put("explanation", "Les ponts Einstein-Rosen (trous de ver) sont équivalents à l'intrication EPR");
        demo.put("implications", List.of(
            "Toute intrication quantique crée un micro trou de ver",
            "Les trous de ver ne sont pas traversables sauf cas spéciaux",
            "Le pistolet de Vince crée des ponts traversables (fiction quantique)",
            "Résout le paradoxe du firewall des trous noirs"
        ));
        
        demo.put("game_integration", Map.of(
            "vince_gun", "Crée des ponts ER=EPR traversables",
            "quantum_entanglement", "Connecte instantanément deux entités",
            "wormhole_travel", "Permet le voyage instantané d'information",
            "paradox_resolution", "Maintient la causalité malgré les voyages temporels"
        ));
        
        demo.put("jean_quote", "Sur mon canapé, je peux voir tous les ponts ER=EPR de l'univers !");
        demo.put("vince_quote", "Vincent Vega's Quantum .45 - Because regular bullets are for chumps.");
        demo.put("grut_observation", "GRUT VOIT LES CONNEXIONS CACHÉES ENTRE TOUTES CHOSES.");
        
        return ResponseEntity.ok(demo);
    }
} 