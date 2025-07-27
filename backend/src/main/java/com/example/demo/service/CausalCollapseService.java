package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import com.example.demo.model.GameState;
import com.example.demo.model.Position;

/**
 * ⚡ CAUSAL COLLAPSE SERVICE - Gestionnaire de Collapses Causaux
 * 
 * JEAN: "Quand la causalité s'effondre, la réalité doit choisir."
 * GRUT: "Je vois tous les collapses possibles dans toutes les dimensions."
 * MEMENTO: "J'archive chaque collapse pour comprendre les patterns."
 */
@Service
public class CausalCollapseService {
    
    @Autowired
    private GameService gameService;
    
    @Autowired
    @Lazy
    private QuantumService quantumService;
    
    @Autowired
    private TemporalItemService temporalItemService;
    
    // 📊 Registre des collapses
    private final Map<String, CollapseEvent> collapseHistory = new ConcurrentHashMap<>();
    private final Map<String, List<String>> chainReactions = new ConcurrentHashMap<>();
    
    // 🌀 Configuration des collapses
    private static final double PARADOX_THRESHOLD = 0.85;
    private static final int MAX_CHAIN_DEPTH = 5;
    private static final long COLLAPSE_COOLDOWN_MS = 1000;
    
    // 📈 Métriques
    private int totalCollapses = 0;
    private int paradoxesCreated = 0;
    private int chainsTriggered = 0;
    
    /**
     * ⚡ Événement de Collapse
     */
    public static class CollapseEvent {
        private String id;
        private String type;
        private long timestamp;
        private Map<String, Object> beforeState;
        private Map<String, Object> afterState;
        private double paradoxRisk;
        private String triggeredBy;
        private List<String> affectedEntities;
        
        public CollapseEvent(String type, String triggeredBy) {
            this.id = UUID.randomUUID().toString();
            this.type = type;
            this.timestamp = System.currentTimeMillis();
            this.triggeredBy = triggeredBy;
            this.affectedEntities = new ArrayList<>();
            this.beforeState = new HashMap<>();
            this.afterState = new HashMap<>();
        }
        
        // Getters...
        public String getId() { return id; }
        public String getType() { return type; }
        public long getTimestamp() { return timestamp; }
        public double getParadoxRisk() { return paradoxRisk; }
    }
    
    /**
     * 🌀 Gérer un Collapse Causal
     */
    public Map<String, Object> handleCollapse(String collapseType, Map<String, Object> parameters) {
        Map<String, Object> result = new HashMap<>();
        
        // Créer l'événement
        CollapseEvent event = new CollapseEvent(collapseType, 
            (String) parameters.getOrDefault("triggeredBy", "UNKNOWN"));
        
        // Capturer l'état avant
        captureBeforeState(event, parameters);
        
        // Calculer le risque de paradoxe
        event.paradoxRisk = calculateParadoxRisk(collapseType, parameters);
        
        // Exécuter le collapse selon le type
        switch (collapseType) {
            case "TEMPORAL_DECISION":
                result = handleTemporalDecision(event, parameters);
                break;
                
            case "QUANTUM_OBSERVATION":
                result = handleQuantumObservation(event, parameters);
                break;
                
            case "CAUSAL_LOOP":
                result = handleCausalLoop(event, parameters);
                break;
                
            case "TIMELINE_MERGE":
                result = handleTimelineMerge(event, parameters);
                break;
                
            case "REALITY_FORK":
                result = handleRealityFork(event, parameters);
                break;
                
            default:
                result = handleGenericCollapse(event, parameters);
        }
        
        // Capturer l'état après
        captureAfterState(event, result);
        
        // Enregistrer l'événement
        collapseHistory.put(event.id, event);
        totalCollapses++;
        
        // Vérifier les réactions en chaîne
        checkChainReactions(event);
        
        // Ajouter les métadonnées
        result.put("collapse_id", event.id);
        result.put("paradox_risk", event.paradoxRisk);
        result.put("timestamp", event.timestamp);
        
        return result;
    }
    
    /**
     * 🕐 Collapse de Décision Temporelle
     */
    private Map<String, Object> handleTemporalDecision(CollapseEvent event, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        String decision = (String) params.get("decision");
        String timeline = (String) params.get("timeline");
        
        // Forcer le choix temporel
        result.put("chosen_path", decision);
        result.put("abandoned_paths", params.get("alternatives"));
        result.put("temporal_stability", 1.0 - event.paradoxRisk);
        
        // Effet sur le jeu - enregistrement simple
        if (gameService != null && timeline != null) {
            // Log de la décision temporelle
            System.out.println("🌀 Collapse temporel: " + timeline + " → " + decision);
            System.out.println("📊 Stabilité temporelle: " + result.get("temporal_stability"));
            
            // L'effet réel sera appliqué via les mécaniques de formules magiques
            // qui utiliseront ce collapse enregistré dans collapseHistory
        }
        
        // Message narratif
        result.put("narrative", String.format(
            "Le temps s'arrête... puis reprend. La décision '%s' est maintenant gravée dans la causalité.",
            decision
        ));
        
        return result;
    }
    
    /**
     * 👁️ Collapse par Observation Quantique
     */
    private Map<String, Object> handleQuantumObservation(CollapseEvent event, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        String stateId = (String) params.get("stateId");
        Object finalValue = params.get("finalValue");
        String observer = (String) params.get("observer");
        
        event.affectedEntities.add(stateId);
        
        result.put("observed_state", stateId);
        result.put("collapsed_to", finalValue);
        result.put("observer", observer);
        result.put("quantum_decoherence", true);
        
        // Effets secondaires possibles
        if (event.paradoxRisk > PARADOX_THRESHOLD) {
            result.put("side_effect", "REALITY_GLITCH");
            result.put("glitch_message", "La réalité scintille un instant...");
            paradoxesCreated++;
        }
        
        return result;
    }
    
    /**
     * 🔄 Collapse de Boucle Causale
     */
    private Map<String, Object> handleCausalLoop(CollapseEvent event, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        String loopId = (String) params.get("loopId");
        int iterations = (int) params.getOrDefault("iterations", 0);
        boolean broken = (boolean) params.getOrDefault("broken", false);
        
        if (broken) {
            result.put("status", "LOOP_BROKEN");
            result.put("message", "La boucle causale est enfin brisée !");
            result.put("freedom", true);
            
            // Récompense pour avoir brisé la boucle
            if (temporalItemService != null) {
                Map<String, Object> reward = new HashMap<>();
                reward.put("item_type", "LOOP_BREAKER_ARTIFACT");
                reward.put("power", iterations * 10);
                result.put("reward", reward);
            }
        } else {
            result.put("status", "LOOP_CONTINUES");
            result.put("iterations", iterations + 1);
            result.put("message", "Le cycle continue... encore et encore...");
        }
        
        return result;
    }
    
    /**
     * 🌐 Collapse de Fusion de Timelines
     */
    private Map<String, Object> handleTimelineMerge(CollapseEvent event, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        List<String> timelines = (List<String>) params.get("timelines");
        String dominantTimeline = (String) params.get("dominant");
        
        result.put("merged_timelines", timelines);
        result.put("result_timeline", dominantTimeline);
        result.put("memories_preserved", true);
        result.put("convergence_point", System.currentTimeMillis());
        
        // Effets de la fusion
        Map<String, Object> effects = new HashMap<>();
        effects.put("deja_vu_intensity", timelines.size() * 0.25);
        effects.put("temporal_echoes", true);
        effects.put("paradox_resolution", "MERGE_DOMINANT");
        result.put("effects", effects);
        
        return result;
    }
    
    /**
     * 🍴 Collapse de Bifurcation de Réalité
     */
    private Map<String, Object> handleRealityFork(CollapseEvent event, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        String decision = (String) params.get("fork_point");
        
        // Créer deux réalités
        String reality1 = UUID.randomUUID().toString();
        String reality2 = UUID.randomUUID().toString();
        
        result.put("fork_point", decision);
        result.put("reality_a", reality1);
        result.put("reality_b", reality2);
        result.put("player_choice_required", true);
        
        // Les deux futurs possibles
        Map<String, Object> futureA = new HashMap<>();
        futureA.put("path", "LIGHT");
        futureA.put("consequence", "Harmonie mais stagnation");
        
        Map<String, Object> futureB = new HashMap<>();
        futureB.put("path", "DARK");
        futureB.put("consequence", "Chaos mais évolution");
        
        result.put("future_a", futureA);
        result.put("future_b", futureB);
        
        return result;
    }
    
    /**
     * 💫 Collapse Générique
     */
    private Map<String, Object> handleGenericCollapse(CollapseEvent event, Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();
        
        result.put("type", "GENERIC_COLLAPSE");
        result.put("parameters", params);
        result.put("success", true);
        result.put("message", "La causalité s'ajuste à la nouvelle réalité");
        
        return result;
    }
    
    /**
     * 📊 Calculer le Risque de Paradoxe
     */
    private double calculateParadoxRisk(String collapseType, Map<String, Object> params) {
        double baseRisk = 0.1;
        
        // Risque selon le type
        switch (collapseType) {
            case "CAUSAL_LOOP":
                baseRisk = 0.6;
                break;
            case "TIMELINE_MERGE":
                baseRisk = 0.8;
                break;
            case "REALITY_FORK":
                baseRisk = 0.5;
                break;
            case "QUANTUM_OBSERVATION":
                baseRisk = 0.3;
                break;
        }
        
        // Modificateurs
        if (params.containsKey("force_collapse")) {
            baseRisk += 0.2;
        }
        
        if (params.containsKey("bootstrap_paradox")) {
            baseRisk += 0.3;
        }
        
        // Historique récent
        long recentCollapses = collapseHistory.values().stream()
            .filter(e -> System.currentTimeMillis() - e.timestamp < 10000)
            .count();
        
        baseRisk += recentCollapses * 0.05;
        
        return Math.min(1.0, baseRisk);
    }
    
    /**
     * 🔗 Vérifier les Réactions en Chaîne
     */
    private void checkChainReactions(CollapseEvent event) {
        if (event.paradoxRisk > 0.7) {
            // Risque de réaction en chaîne
            List<String> chain = chainReactions.computeIfAbsent(
                event.type, k -> new ArrayList<>()
            );
            
            chain.add(event.id);
            
            if (chain.size() >= 3) {
                // Déclencher un méga-collapse
                triggerMegaCollapse(chain);
                chain.clear();
            }
        }
    }
    
    /**
     * 💥 Déclencher un Méga-Collapse
     */
    private void triggerMegaCollapse(List<String> chain) {
        chainsTriggered++;
        
        Map<String, Object> megaParams = new HashMap<>();
        megaParams.put("chain_events", chain);
        megaParams.put("severity", "CRITICAL");
        megaParams.put("triggeredBy", "CHAIN_REACTION");
        
        // Collapse majeur
        handleCollapse("REALITY_RESTRUCTURE", megaParams);
        
        System.out.println("💥 MÉGA-COLLAPSE DÉCLENCHÉ ! Réalité en reconstruction...");
    }
    
    /**
     * 📸 Capturer l'État Avant
     */
    private void captureBeforeState(CollapseEvent event, Map<String, Object> params) {
        event.beforeState.put("parameters", new HashMap<>(params));
        event.beforeState.put("timestamp", System.currentTimeMillis());
        
        // GRUT: Plus de tours ! Timeline asynchrone !
        event.beforeState.put("temporal_flow", System.currentTimeMillis());
        event.beforeState.put("timeline_state", "ASYNCHRONOUS");
    }
    
    /**
     * 📸 Capturer l'État Après
     */
    private void captureAfterState(CollapseEvent event, Map<String, Object> result) {
        event.afterState.put("result", new HashMap<>(result));
        event.afterState.put("timestamp", System.currentTimeMillis());
        event.afterState.put("duration_ms", 
            (long)event.afterState.get("timestamp") - (long)event.beforeState.get("timestamp"));
    }
    
    /**
     * 📊 Obtenir les Statistiques
     */
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("total_collapses", totalCollapses);
        stats.put("paradoxes_created", paradoxesCreated);
        stats.put("chains_triggered", chainsTriggered);
        stats.put("recent_collapses", collapseHistory.size());
        
        // Collapse le plus fréquent
        Map<String, Long> typeCount = new HashMap<>();
        collapseHistory.values().forEach(e -> 
            typeCount.merge(e.type, 1L, Long::sum)
        );
        
        stats.put("collapse_types", typeCount);
        stats.put("average_paradox_risk", 
            collapseHistory.values().stream()
                .mapToDouble(e -> e.paradoxRisk)
                .average()
                .orElse(0.0)
        );
        
        return stats;
    }
    
    /**
     * 🔍 Obtenir l'Historique
     */
    public List<CollapseEvent> getRecentHistory(int limit) {
        return collapseHistory.values().stream()
            .sorted((a, b) -> Long.compare(b.timestamp, a.timestamp))
            .limit(limit)
            .toList();
    }
    
    /**
     * 🎯 Forcer un Collapse Manuel
     */
    public Map<String, Object> forceCollapse(String targetId, String reason) {
        Map<String, Object> params = new HashMap<>();
        params.put("target", targetId);
        params.put("reason", reason);
        params.put("force_collapse", true);
        params.put("triggeredBy", "MANUAL_OVERRIDE");
        
        return handleCollapse("FORCED_COLLAPSE", params);
    }
} 