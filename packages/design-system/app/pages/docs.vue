<template>
  <div class="docs-home">
    <header class="docs-header">
      <h1>Wrikka Design System</h1>
      <p>Documentation และ Component Library</p>
    </header>

    <nav class="docs-nav">
      <div class="nav-section">
        <h2>UI Components</h2>
        <ul>
          <li><NuxtLink to="/docs/components/button">Button</NuxtLink></li>
          <li><NuxtLink to="/docs/components/card">Card</NuxtLink></li>
          <li><NuxtLink to="/docs/components/input">Input</NuxtLink></li>
          <li><NuxtLink to="/docs/components/badge">Badge</NuxtLink></li>
          <li><NuxtLink to="/docs/components/avatar">Avatar</NuxtLink></li>
        </ul>
      </div>

      <div class="nav-section">
        <h2>Getting Started</h2>
        <p>เริ่มต้นใช้งาน Design System ของเรา</p>
        <ul>
          <li>ติดตั้ง Components</li>
          <li>ใช้งานกับ Nuxt</li>
          <li>Customization</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.docs-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.docs-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
  border-bottom: 2px solid #e5e7eb;
}

.docs-header h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
}

.docs-header p {
  font-size: 1.25rem;
  color: #6b7280;
}

.docs-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.nav-section {
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
}

.nav-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.nav-section p {
  margin-bottom: 1rem;
  color: #6b7280;
}

.nav-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-section li {
  margin-bottom: 0.5rem;
}

.nav-section a {
  display: block;
  padding: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.nav-section a:hover {
  background: white;
  color: #3b82f6;
  padding-left: 1rem;
}
</style>
