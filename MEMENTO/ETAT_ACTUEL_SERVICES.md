# 🟢 SERVICES ACTUELLEMENT ACTIFS

**Date**: 2025-01-26 20:30

## ✅ CE QUI TOURNE MAINTENANT

1. **Port 8080** - Backend Spring Boot ✅
   - PID: 34957
   - API disponible

2. **Port 8000** - Vince Demo HTML ✅
   - PID: 36912
   - URL: http://localhost:8000/vince-vega-map-demo-backend.html

3. **Port 8001** - GRUT Panopticon ✅
   - PID: 36960
   - URL: http://localhost:8001

4. **Port 8002** - (Backup GRUT si 8001 occupé) ✅
   - PID: 35445
   - URL: http://localhost:8002

5. **Port 3000** - Morgana React ✅
   - PID: 38581
   - URL: http://localhost:3000

## 🎯 POUR UTILISER

### Interface Simple (Vince):
```
Ouvre: http://localhost:8000/vince-vega-map-demo-backend.html
```

### Interface React (Morgana):
```
Ouvre: http://localhost:3000
```

### Dashboard GRUT:
```
Ouvre: http://localhost:8001
```

## 📝 COMMANDES UTILES

```bash
# Voir l'état
./hots status

# Arrêter tout
./hots stop

# Redémarrer tout
./hots start

# Lancer une interface spécifique
./hots vince    # Port 8000
./hots morgana  # Port 3000
./hots grut     # Port 8001
``` 