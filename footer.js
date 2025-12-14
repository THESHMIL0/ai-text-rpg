class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .footer {
          background-color: rgba(17, 24, 39, 0.9);
          backdrop-filter: blur(8px);
        }
        .footer-link {
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: #a5b4fc;
        }
      </style>
      <footer class="footer border-t border-gray-800 mt-12">
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-white mb-4">Dungeon Delvers</h3>
              <p class="text-gray-400">A text-based RPG adventure in your browser. Explore dungeons, battle monsters, and find treasure!</p>
            </div>
            
            <div>
              <h4 class="text-md font-semibold text-white mb-4">Game</h4>
              <ul class="space-y-2">
                <li><a href="#" class="footer-link text-gray-400">Adventure</a></li>
                <li><a href="#" class="footer-link text-gray-400">Characters</a></li>
                <li><a href="#" class="footer-link text-gray-400">Leaderboard</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-md font-semibold text-white mb-4">Resources</h4>
              <ul class="space-y-2">
                <li><a href="#" class="footer-link text-gray-400">Documentation</a></li>
                <li><a href="#" class="footer-link text-gray-400">API</a></li>
                <li><a href="#" class="footer-link text-gray-400">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-md font-semibold text-white mb-4">Connect</h4>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i data-feather="twitter"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i data-feather="github"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <i data-feather="discord"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2023 Dungeon Delvers Online. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);