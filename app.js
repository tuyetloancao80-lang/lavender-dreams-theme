/**
 * Lavender Dreams Theme - VS Code Extension Entry Point
 * Greets users when activating the theme extension
 */

const vscode = require('vscode');

/**
 * Called when the extension is activated
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
    console.log('💜 Lavender Dreams Theme extension is now active!');
    
    // Register command to show welcome message manually
    const welcomeCommand = vscode.commands.registerCommand('lavender-dreams.showWelcome', () => {
        showWelcomeMessage();
    });
    
    context.subscriptions.push(welcomeCommand);
    
    // Check if this is the first time the extension is activated (installation)
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    
    if (!hasShownWelcome) {
        // Mark that we've shown the welcome message
        await context.globalState.update('hasShownWelcome', true);
        
        // Automatically show welcome message on first installation
        showWelcomeMessage();
    }
}

/**
 * Shows the welcome message in a webview panel
 */
function showWelcomeMessage() {
    const panel = vscode.window.createWebviewPanel(
        'lavenderDreamsWelcome',
        '💜 Lavender Dreams Theme',
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );
    
    panel.webview.html = getWelcomeHtml();
    
    // Handle messages from the webview
    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'activateTheme':
                    vscode.commands.executeCommand('workbench.action.selectTheme');
                    break;
                case 'openSettings':
                    vscode.commands.executeCommand('workbench.action.openSettings', 'workbench.colorTheme');
                    break;
            }
        }
    );
}

/**
 * Generates the HTML content for the welcome webview
 */
function getWelcomeHtml() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lavender Dreams Theme</title>
        <style>
            body {
                background: linear-gradient(135deg, #2a2438 0%, #251f30 50%, #1f1a28 100%);
                color: #f8f4ff;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 20px;
                min-height: 100vh;
                overflow-x: hidden;
                position: relative;
            }
            
            /* Floating lavender petals animation */
            .petals {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            }
            
            .petal {
                position: absolute;
                width: 8px;
                height: 8px;
                background: #b19cd9;
                border-radius: 50% 0 50% 0;
                opacity: 0.6;
                animation: float 8s infinite linear;
            }
            
            @keyframes float {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
                position: relative;
                z-index: 1;
            }
            
            .dreamy-title {
                font-size: 3.5em;
                font-weight: 300;
                background: linear-gradient(45deg, #b19cd9, #c9a9dd, #d8b4e2, #e6ddff);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 20px;
                animation: dreamyGlow 3s ease-in-out infinite alternate;
                text-shadow: 0 0 30px rgba(177, 156, 217, 0.3);
                letter-spacing: 2px;
            }
            
            @keyframes dreamyGlow {
                from { 
                    filter: drop-shadow(0 0 10px #b19cd9);
                    transform: scale(1);
                }
                to { 
                    filter: drop-shadow(0 0 25px #d8b4e2);
                    transform: scale(1.02);
                }
            }
            
            .welcome-box {
                background: rgba(31, 26, 40, 0.8);
                border: 2px solid #b19cd9;
                border-radius: 20px;
                padding: 40px;
                margin: 30px 0;
                box-shadow: 
                    0 0 40px rgba(177, 156, 217, 0.2),
                    inset 0 0 30px rgba(177, 156, 217, 0.05);
                backdrop-filter: blur(15px);
                position: relative;
                overflow: hidden;
            }
            
            .welcome-box::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(177, 156, 217, 0.1) 0%, transparent 70%);
                animation: dreamyPulse 4s ease-in-out infinite;
                z-index: -1;
            }
            
            @keyframes dreamyPulse {
                0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
                50% { transform: scale(1.1) rotate(180deg); opacity: 0.1; }
            }
            
            .feature-list {
                text-align: left;
                margin: 30px 0;
            }
            
            .feature-item {
                margin: 15px 0;
                padding: 20px;
                background: rgba(216, 180, 226, 0.08);
                border-left: 4px solid #c9a9dd;
                border-radius: 12px;
                transition: all 0.4s ease;
                position: relative;
                overflow: hidden;
            }
            
            .feature-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(230, 221, 255, 0.1), transparent);
                transition: left 0.6s ease;
            }
            
            .feature-item:hover::before {
                left: 100%;
            }
            
            .feature-item:hover {
                background: rgba(216, 180, 226, 0.15);
                transform: translateX(8px);
                border-left-color: #d8b4e2;
            }
            
            .button {
                background: linear-gradient(45deg, #b19cd9, #c9a9dd);
                border: none;
                color: #1f1a28;
                padding: 18px 35px;
                margin: 15px;
                border-radius: 30px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.4s ease;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                position: relative;
                overflow: hidden;
                font-size: 0.9em;
            }
            
            .button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.6s ease;
            }
            
            .button:hover::before {
                left: 100%;
            }
            
            .button:hover {
                transform: translateY(-4px) scale(1.05);
                box-shadow: 0 15px 35px rgba(177, 156, 217, 0.4);
                background: linear-gradient(45deg, #c9a9dd, #d8b4e2);
            }
            
            .button-secondary {
                background: linear-gradient(45deg, #d8b4e2, #e6ddff);
                color: #2a2438;
            }
            
            .button-secondary:hover {
                background: linear-gradient(45deg, #e6ddff, #f8f4ff);
            }
            
            .theme-preview {
                display: flex;
                justify-content: space-around;
                margin: 40px 0;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .theme-card {
                background: rgba(37, 31, 48, 0.9);
                border: 2px solid #b19cd9;
                border-radius: 20px;
                padding: 30px;
                flex: 1;
                min-width: 280px;
                max-width: 400px;
                transition: all 0.4s ease;
                position: relative;
                overflow: hidden;
            }
            
            .theme-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, #b19cd9 0%, transparent 70%);
                opacity: 0;
                transition: opacity 0.4s ease;
                z-index: -1;
            }
            
            .theme-card:hover::before {
                opacity: 0.08;
            }
            
            .theme-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: #d8b4e2;
                box-shadow: 0 20px 40px rgba(177, 156, 217, 0.25);
            }
            
            .theme-name {
                color: #c9a9dd;
                font-size: 1.4em;
                font-weight: 600;
                margin-bottom: 15px;
                text-align: center;
            }
            
            .ascii-art {
                font-family: 'Courier New', monospace;
                font-size: 0.4em;
                color: #b19cd9;
                white-space: pre;
                margin: 30px 0;
                text-shadow: 0 0 15px #b19cd9;
                line-height: 1.1;
                opacity: 0.8;
            }
            
            .instructions {
                background: rgba(201, 169, 221, 0.08);
                border: 2px solid #c9a9dd;
                border-radius: 15px;
                padding: 25px;
                margin: 30px 0;
                text-align: left;
            }
            
            .step {
                margin: 12px 0;
                padding: 8px 0;
                font-size: 1.1em;
            }
            
            .step-number {
                color: #d8b4e2;
                font-weight: bold;
                font-size: 1.2em;
            }
            
            .subtitle {
                color: #e0d8f0;
                font-size: 1.2em;
                margin-bottom: 25px;
                font-weight: 300;
            }
            
            .emoji {
                font-size: 1.8em;
                margin: 0 8px;
            }
            
            .color-palette {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin: 30px 0;
                flex-wrap: wrap;
            }
            
            .color-swatch {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 3px solid rgba(248, 244, 255, 0.3);
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .color-swatch:hover {
                transform: scale(1.2);
                border-color: #f8f4ff;
                box-shadow: 0 0 20px rgba(248, 244, 255, 0.5);
            }
            
            .swatch-lavender { background: #b19cd9; }
            .swatch-periwinkle { background: #c9a9dd; }
            .swatch-plum { background: #dda0dd; }
            .swatch-mauve { background: #d8b4e2; }
            .swatch-dewdrop { background: #e6ddff; }
            
            .inspiration-text {
                font-style: italic;
                color: #d8b4e2;
                font-size: 1.1em;
                margin: 20px 0;
                line-height: 1.6;
            }
        </style>
    </head>
    <body>
        <!-- Floating lavender petals -->
        <div class="petals" id="petals"></div>
        
        <div class="container">
            <div class="dreamy-title">LAVENDER DREAMS</div>
            
            <div class="ascii-art">
    ██╗      █████╗ ██╗   ██╗███████╗███╗   ██╗██████╗ ███████╗██████╗ 
    ██║     ██╔══██╗██║   ██║██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗
    ██║     ███████║██║   ██║█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝
    ██║     ██╔══██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
    ███████╗██║  ██║ ╚████╔╝ ███████╗██║ ╚████║██████╔╝███████╗██║  ██║
    ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
    
    ██████╗ ██████╗ ███████╗ █████╗ ███╗   ███╗███████╗
    ██╔══██╗██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔════╝
    ██║  ██║██████╔╝█████╗  ███████║██╔████╔██║███████╗
    ██║  ██║██╔══██╗██╔══╝  ██╔══██║██║╚██╔╝██║╚════██║
    ██████╔╝██║  ██║███████╗██║  ██║██║ ╚═╝ ██║███████║
    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
            </div>
            
            <div class="welcome-box">
                <h2><span class="emoji">🌸</span>WELCOME TO THE LAVENDER FIELD<span class="emoji">🌸</span></h2>
                <p class="subtitle">Thank you for installing the <strong>Lavender Dreams Theme</strong>!</p>
                <p class="inspiration-text">
                    "Step into a gentle pastel world inspired by twilight in a lavender field. 
                    Where soft purple hues meet dreamy coding sessions, and every line of code 
                    feels like poetry written under a starlit sky."
                </p>
                
                <div class="color-palette">
                    <div class="color-swatch swatch-lavender" title="Lavender #b19cd9"></div>
                    <div class="color-swatch swatch-periwinkle" title="Periwinkle #c9a9dd"></div>
                    <div class="color-swatch swatch-plum" title="Plum Blossom #dda0dd"></div>
                    <div class="color-swatch swatch-mauve" title="Misty Mauve #d8b4e2"></div>
                    <div class="color-swatch swatch-dewdrop" title="Dewdrop #e6ddff"></div>
                </div>
            </div>
            
            <div class="theme-preview">
                <div class="theme-card">
                    <div class="theme-name">🌙 Lavender Dreams</div>
                    <p>Full intensity lavender experience with rich purple backgrounds and dreamy pastel accents perfect for creative coding sessions.</p>
                </div>
                <div class="theme-card">
                    <div class="theme-name">✨ Lavender Dreams Soft</div>
                    <p>Softer, more muted variant ideal for extended coding sessions with gentle on the eyes lavender tones.</p>
                </div>
            </div>
            
            <div class="feature-list">
                <div class="feature-item">🌸 Gentle pastel lavender backgrounds inspired by twilight fields</div>
                <div class="feature-item">💜 Harmonious purple color palette with low saturation</div>
                <div class="feature-item">🌙 Perfect for evening and night coding sessions</div>
                <div class="feature-item">✨ Dreamy, calming aesthetic that reduces eye strain</div>
                <div class="feature-item">🎨 Two beautiful variants to match your mood</div>
                <div class="feature-item">💫 Optimized for creative and meditative programming</div>
                <div class="feature-item">🔮 Full semantic highlighting with magical touches</div>
                <div class="feature-item">🌺 Carefully crafted for long coding sessions</div>
            </div>
            
            <div class="instructions">
                <h3>🎯 How to activate your dreamy theme:</h3>
                <div class="step"><span class="step-number">1.</span> Open VS Code Command Palette (Ctrl+Shift+P / Cmd+Shift+P)</div>
                <div class="step"><span class="step-number">2.</span> Type "Preferences: Color Theme"</div>
                <div class="step"><span class="step-number">3.</span> Select "Lavender Dreams" or "Lavender Dreams Soft"</div>
                <div class="step"><span class="step-number">4.</span> Let the magic begin! ✨</div>
            </div>
            
            <div style="margin: 40px 0;">
                <button class="button" onclick="activateTheme()">🎨 Choose Theme</button>
                <button class="button button-secondary" onclick="openSettings()">⚙️ Open Settings</button>
            </div>
            
            <p style="margin-top: 50px; color: #c9a9dd; font-size: 1.2em;">
                <span class="emoji">🌙</span>Sweet dreams and happy coding!<span class="emoji">💜</span>
            </p>
        </div>
        
        <script>
            const vscode = acquireVsCodeApi();
            
            // Generate floating lavender petals
            function createPetals() {
                const petalsContainer = document.getElementById('petals');
                const numberOfPetals = 50;
                
                for (let i = 0; i < numberOfPetals; i++) {
                    const petal = document.createElement('div');
                    petal.className = 'petal';
                    petal.style.left = Math.random() * 100 + '%';
                    petal.style.animationDelay = Math.random() * 8 + 's';
                    petal.style.animationDuration = (Math.random() * 4 + 6) + 's';
                    
                    // Vary petal colors
                    const colors = ['#b19cd9', '#c9a9dd', '#d8b4e2', '#e6ddff'];
                    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
                    
                    // Vary petal sizes
                    const size = Math.random() * 6 + 4;
                    petal.style.width = size + 'px';
                    petal.style.height = size + 'px';
                    
                    petalsContainer.appendChild(petal);
                }
            }
            
            function activateTheme() {
                vscode.postMessage({
                    command: 'activateTheme'
                });
            }
            
            function openSettings() {
                vscode.postMessage({
                    command: 'openSettings'
                });
            }
            
            // Add hover effects to color swatches
            document.querySelectorAll('.color-swatch').forEach(swatch => {
                swatch.addEventListener('click', function() {
                    const title = this.getAttribute('title');
                    console.log('Color selected:', title);
                });
            });
            
            // Initialize petals when page loads
            createPetals();
            
            // Recreate petals periodically for continuous effect
            setInterval(createPetals, 10000);
        </script>
    </body>
    </html>
    `;
}

/**
 * Called when the extension is deactivated
 */
function deactivate() {
    console.log('💜 Lavender Dreams Theme extension deactivated');
}

module.exports = {
    activate,
    deactivate
};
