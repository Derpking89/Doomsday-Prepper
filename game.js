const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRID_SIZE = 8;
const CELL_SIZE = canvas.width / GRID_SIZE;

let score = 0;
let resources = { wood: 0, metal: 0, water: 0 };
let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null));

const buildingColors = {
    wall: "#8B4513",
    door: "#654321",
    window: "#87CEFA"
};

// Draw grid and objects
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            ctx.strokeStyle = "#999";
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            if (grid[x][y]) {
                ctx.fillStyle = buildingColors[grid[x][y]];
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

// Update score and resources UI
function updateUI() {
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("wood").textContent = resources.wood;
    document.getElementById("metal").textContent = resources.metal;
    document.getElementById("water").textContent = resources.water;
}

// Place a building part on tap
canvas.addEventListener("click", function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    if (!grid[x][y] && resources.wood >= 1) {
        grid[x][y] = "wall";
        resources.wood -= 1;
        score += 1;
        updateUI();
        drawGrid();
    }
});

// Resource buttons
document.getElementById("gatherWood").addEventListener("click", () => { resources.wood += 1; updateUI(); });
document.getElementById("gatherMetal").addEventListener("click", () => { resources.metal += 1; updateUI(); });
document.getElementById("gatherWater").addEventListener("click", () => { resources.water += 1; updateUI(); });

// Random events
function doomsdayEvent() {
    const events = ["storm", "fire", "zombie"];
    const event = events[Math.floor(Math.random() * events.length)];
    let loss = Math.floor(Math.random() * 3) + 1; // 1-3 resources lost
    switch(event) {
        case "storm":
            resources.wood = Math.max(resources.wood - loss, 0);
            alert("Storm! Lost " + loss + " wood.");
            break;
        case "fire":
            resources.metal = Math.max(resources.metal - loss, 0);
            alert("Fire! Lost " + loss + " metal.");
            break;
        case "zombie":
            resources.water = Math.max(resources.water - loss, 0);
            alert("Zombie attack! Lost " + loss + " water.");
            break;
    }
    updateUI();
}

// Event timer every 15 seconds
setInterval(doomsdayEvent, 15000);

drawGrid();
updateUI();