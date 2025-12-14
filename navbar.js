class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          background-color: rgba(17, 24, 39, 0.9);
          backdrop-filter: blur(8px);
        }
        .nav-link {
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          color: #a5b4fc;
        }
      </style>
      <nav class="navbar border-b border-gray-800">
        <div class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="flex items-center space-x-2">
              <i data-feather="sword" class="text-primary-500"></i>
              <span class="text-xl font-bold text-white">Dungeon Delvers</span>
            </a>
            
            <div class="hidden md:flex space-x-6">
              <a href="#" class="nav-link text-white font-medium">Adventure</a>
              <a href="#" class="nav-link text-gray-400 hover:text-white font-medium">Characters</a>
              <a href="#" class="nav-link text-gray-400 hover:text-white font-medium">Leaderboard</a>
              <a href="#" class="nav-link text-gray-400 hover:text-white font-medium">About</a>
            </div>
            
            <div class="flex items-center space-x-4">
              <button class="p-2 rounded-full hover:bg-gray-700 transition">
                <i data-feather="moon" class="text-gray-300"></i>
              </button>
              <button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);