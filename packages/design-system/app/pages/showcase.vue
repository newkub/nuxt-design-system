<template>
  <div class="flex flex-1 overflow-hidden">
    <!-- Sidebar Navigation -->
    <aside class="hidden md:flex md:flex-col w-64 lg:w-72 flex-shrink-0 border-r border-gray-200 bg-white">
      <div class="p-4 border-b border-gray-200">
        <h2 class="font-semibold">Showcase</h2>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <nav>
          <h3 class="text-sm font-semibold text-gray-900 mb-2">Design Examples</h3>
          <ul class="space-y-1 mb-6">
            <li>
              <a href="#" class="block py-1 px-2 rounded text-blue-600 bg-blue-50">Dashboard</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">E-commerce</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Blog</a>
            </li>
          </ul>
          
          <h3 class="text-sm font-semibold text-gray-900 mb-2">Component Demos</h3>
          <ul class="space-y-1 mb-6">
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Form Builder</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Data Visualization</a>
            </li>
          </ul>
          
          <h3 class="text-sm font-semibold text-gray-900 mb-2">Templates</h3>
          <ul class="space-y-1">
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Landing Page</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Admin Panel</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4 md:p-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Showcase</h1>
        <p class="text-gray-600 mb-8">Explore real-world examples and templates built with Wrikka Design System.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- Dashboard Example -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 class="text-white font-semibold">Dashboard</h3>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p class="text-gray-600 mb-4">
                A comprehensive dashboard with charts, metrics, and data visualization components.
              </p>
              <div class="flex justify-between items-center">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Popular
                </span>
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">View Demo →</a>
              </div>
            </div>
          </div>
          
          <!-- E-commerce Example -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="h-40 bg-gradient-to-r from-green-500 to-teal-600 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 class="text-white font-semibold">E-commerce</h3>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Product Catalog</h3>
              <p class="text-gray-600 mb-4">
                A complete e-commerce interface with product listings, cart, and checkout flow.
              </p>
              <div class="flex justify-between items-center">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  New
                </span>
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">View Demo →</a>
              </div>
            </div>
          </div>
          
          <!-- Blog Example -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="h-40 bg-gradient-to-r from-purple-500 to-pink-600 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 class="text-white font-semibold">Blog</h3>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Content Management</h3>
              <p class="text-gray-600 mb-4">
                A modern blog interface with article editor, comments, and user management.
              </p>
              <div class="flex justify-between items-center">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Updated
                </span>
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">View Demo →</a>
              </div>
            </div>
          </div>
          
          <!-- Form Builder Example -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="h-40 bg-gradient-to-r from-yellow-500 to-orange-600 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 class="text-white font-semibold">Form Builder</h3>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Dynamic Forms</h3>
              <p class="text-gray-600 mb-4">
                A drag-and-drop form builder with validation and conditional logic.
              </p>
              <div class="flex justify-between items-center">
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">View Demo →</a>
              </div>
            </div>
          </div>
          
          <!-- Data Visualization Example -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="h-40 bg-gradient-to-r from-red-500 to-rose-600 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 class="text-white font-semibold">Data Viz</h3>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Reports & Charts</h3>
              <p class="text-gray-600 mb-4">
                Interactive data visualization with charts, graphs, and reporting tools.
              </p>
              <div class="flex justify-between items-center">
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">View Demo →</a>
              </div>
            </div>
          </div>
          
          <!-- Landing Page Example -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="h-40 bg-gradient-to-r from-cyan-500 to-sky-600 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 class="text-white font-semibold">Landing</h3>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Marketing Page</h3>
              <p class="text-gray-600 mb-4">
                A responsive landing page template with call-to-action sections.
              </p>
              <div class="flex justify-between items-center">
                <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">View Demo →</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Using These Examples</h2>
          <p class="text-gray-600 mb-4">
            All showcase examples are built entirely with Wrikka Design System components. You can:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-gray-600 mb-6">
            <li>Copy and paste code snippets directly into your project</li>
            <li>Customize the examples to match your brand colors and styling</li>
            <li>Extend the examples with your own functionality</li>
            <li>Use them as starting points for your own designs</li>
          </ul>
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  <strong>Tip:</strong> Check out the source code of each example to see how components are used together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// This is the showcase page for the Wrikka Design System
</script>