import React, { useState, useEffect } from 'react';
import './PickupNotification.css';

/**
 * Composant de notification pour les pickups d'objets
 * Affiche une animation quand un objet est ramassé
 */
const PickupNotification = ({ pickups = [] }) => {
    const [notifications, setNotifications] = useState([]);
    const [notificationId, setNotificationId] = useState(0);

    useEffect(() => {
        // Ajouter les nouveaux pickups aux notifications
        if (pickups.length > 0) {
            const newNotifications = pickups.map(pickup => ({
                id: notificationId + Math.random(),
                itemName: pickup.itemName || 'Objet',
                icon: pickup.icon || '💎',
                quantity: pickup.quantity || 1,
                rarity: pickup.rarity || 'common',
                timestamp: Date.now()
            }));

            setNotifications(prev => [...prev, ...newNotifications]);
            setNotificationId(prev => prev + pickups.length);
        }
    }, [pickups]);

    useEffect(() => {
        // Nettoyer les vieilles notifications
        const timer = setInterval(() => {
            const now = Date.now();
            setNotifications(prev => 
                prev.filter(notif => now - notif.timestamp < 3000)
            );
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const getRarityClass = (rarity) => {
        const rarityClasses = {
            common: 'rarity-common',
            rare: 'rarity-rare',
            epic: 'rarity-epic',
            legendary: 'rarity-legendary'
        };
        return rarityClasses[rarity] || 'rarity-common';
    };

    return (
        <div className="pickup-notification-container">
            {notifications.map(notif => (
                <div 
                    key={notif.id}
                    className={`pickup-notification ${getRarityClass(notif.rarity)}`}
                    style={{
                        animationDelay: `${Math.random() * 0.1}s`
                    }}
                >
                    <span className="pickup-icon">{notif.icon}</span>
                    <span className="pickup-text">
                        {notif.itemName}
                        {notif.quantity > 1 && ` x${notif.quantity}`}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default PickupNotification; 