<template>
  <div class="flex flex-1 overflow-hidden">
    <!-- Sidebar Navigation -->
    <aside class="hidden md:flex md:flex-col w-64 lg:w-72 flex-shrink-0 border-r border-gray-200 bg-white">
      <div class="p-4 border-b border-gray-200">
        <h2 class="font-semibold">Layouts</h2>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <nav>
          <h3 class="text-sm font-semibold text-gray-900 mb-2">Application Layouts</h3>
          <ul class="space-y-1 mb-6">
            <li>
              <a href="#" class="block py-1 px-2 rounded text-blue-600 bg-blue-50">Default Layout</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Dashboard Layout</a>
            </li>
          </ul>
          
          <h3 class="text-sm font-semibold text-gray-900 mb-2">Page Layouts</h3>
          <ul class="space-y-1 mb-6">
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Single Column</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Two Columns</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Three Columns</a>
            </li>
          </ul>
          
          <h3 class="text-sm font-semibold text-gray-900 mb-2">Specialized Layouts</h3>
          <ul class="space-y-1">
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Form Layout</a>
            </li>
            <li>
              <a href="#" class="block py-1 px-2 rounded text-gray-600 hover:bg-gray-100">Card Layout</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4 md:p-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Default Layout</h1>
        <p class="text-gray-600 mb-8">The default application layout with header, sidebar, and main content area.</p>
        
        <div class="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p class="text-gray-600 mb-6">
            The default layout provides a standard application structure with a top navigation bar, 
            a collapsible sidebar, and a main content area. This layout is suitable for most application pages.
          </p>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Usage</h3>
          <pre class="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-6"><code>&lt;script setup&gt;
definePageMeta({
  layout: 'default'
})
&lt;/script&gt;</code></pre>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Structure</h3>
          <div class="border rounded-lg p-4 bg-gray-50 mb-6">
            <div class="flex flex-col h-64">
              <!-- Header -->
              <div class="h-12 bg-blue-600 rounded mb-2 flex items-center px-4">
                <span class="text-white text-sm">Header</span>
              </div>
              
              <div class="flex flex-1 gap-2">
                <!-- Sidebar -->
                <div class="w-1/4 bg-gray-300 rounded flex items-center justify-center">
                  <span class="text-gray-700 text-sm">Sidebar</span>
                </div>
                
                <!-- Main Content -->
                <div class="flex-1 bg-white rounded border border-gray-300 flex items-center justify-center">
                  <span class="text-gray-700">Main Content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Slots</h2>
          <p class="text-gray-600 mb-4">
            The default layout provides several named slots for customizing different sections:
          </p>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">header</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Content for the top navigation bar</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">sidebar</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Content for the side navigation panel</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">default</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Main content area (default slot)</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">footer</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Content for the bottom footer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Example</h2>
          <p class="text-gray-600 mb-4">
            Here's how to use the default layout with custom content in each slot:
          </p>
          
          <pre class="bg-gray-100 rounded-lg p-4 overflow-x-auto"><code>&lt;script setup&gt;
definePageMeta({
  layout: 'default'
})
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;template #header&gt;
      &lt;h1&gt;Custom Header&lt;/h1&gt;
    &lt;/template&gt;
    
    &lt;template #sidebar&gt;
      &lt;nav&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;
          &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/nav&gt;
    &lt;/template&gt;
    
    &lt;h2&gt;Page Content&lt;/h2&gt;
    &lt;p&gt;This content will appear in the main area.&lt;/p&gt;
    
    &lt;template #footer&gt;
      &lt;p&gt;Custom Footer Content&lt;/p&gt;
    &lt;/template&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// This is the layouts page for the Wrikka Design System
</script>