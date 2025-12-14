// Base game state
const gameState = {
    currentRoom: 'entrance',
    health: 100,
    maxHealth: 100,
    xp: 0,
    level: 1,
    inventory: ['Iron Sword', 'Wooden Shield', 'Health Potion'],
    gold: 15,
    stats: {
        strength: 8,
        dexterity: 6,
        intelligence: 4
    }
};

// Room descriptions
const rooms = {
    entrance: {
        description: "You stand before the entrance of the Forgotten Crypt, a place shunned by villagers for generations. The stone archway is crumbling, and a cold wind whispers from within.",
        exits: {
            north: 'corridor'
        }
    },
    corridor: {
        description: "The narrow corridor stretches before you, its walls lined with ancient carvings. The air is thick with dust and the faint scent of decay.",
        exits: {
            south: 'entrance',
            east: 'chamber'
        }
    },
    chamber: {
        description: "A circular chamber with a high ceiling. In the center lies a stone altar with strange markings. The walls are covered in faded murals.",
        exits: {
            west: 'corridor'
        }
    }
};

// Initialize game
function initGame() {
    updateGameDisplay();
}

// Update game display
function updateGameDisplay() {
    const currentRoom = rooms[gameState.currentRoom];
    document.getElementById('game-text').innerHTML = `
        <p class="mb-4">${currentRoom.description}</p>
        <p class="text-primary-400 font-semibold">What will you do?</p>
    `;
}

// Handle game commands
function handleCommand(command) {
    const gameText = document.getElementById('game-text');
    const currentRoom = rooms[gameState.currentRoom];
    
    // Process command
    const parts = command.toLowerCase().split(' ');
    const action = parts[0];
    const target = parts.slice(1).join(' ');
    
    let response = "";
    
    switch(action) {
        case 'go':
        case 'move':
            const direction = target;
            if (currentRoom.exits[direction]) {
                gameState.currentRoom = currentRoom.exits[direction];
                response = `You move ${direction}.`;
                updateGameDisplay();
            } else {
                response = `You can't go ${direction} from here.`;
            }
            break;
            
        case 'look':
            response = currentRoom.description;
            if (Object.keys(currentRoom.exits).length > 0) {
                response += `\nExits: ${Object.keys(currentRoom.exits).join(', ')}`;
            }
            break;
            
        case 'inventory':
            response = `Inventory:\n- ${gameState.inventory.join('\n- ')}\nGold: ${gameState.gold}`;
            break;
            
        case 'stats':
            response = `Level: ${gameState.level}\nHealth: ${gameState.health}/${gameState.maxHealth}\nXP: ${gameState.xp}\n\nStats:\nStrength: ${gameState.stats.strength}\nDexterity: ${gameState.stats.dexterity}\nIntelligence: ${gameState.stats.intelligence}`;
            break;
            
        case 'use':
            if (gameState.inventory.includes(target)) {
                if (target.toLowerCase().includes('potion')) {
                    gameState.health = Math.min(gameState.health + 30, gameState.maxHealth);
                    gameState.inventory.splice(gameState.inventory.indexOf(target), 1);
                    response = `You drink the health potion and restore 30 health. Current health: ${gameState.health}/${gameState.maxHealth}`;
                } else {
                    response = `You can't use the ${target} right now.`;
                }
            } else {
                response = `You don't have a ${target} in your inventory.`;
            }
            break;
            
        default:
            response = "I don't understand that command. Try 'go [direction]', 'look', 'inventory', or 'stats'.";
    }
    
    gameText.innerHTML += `<p class="mt-4 text-primary-400">> ${command}</p><p class="mb-4">${response}</p>`;
    gameText.scrollTop = gameText.scrollHeight;
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);