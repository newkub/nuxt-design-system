<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const componentMap: Record<string, string> = {
  button: 'Button Component Documentation',
  card: 'Card Component Documentation',
  input: 'Input Component Documentation',
  badge: 'Badge Component Documentation',
  avatar: 'Avatar Component Documentation',
}

const title = componentMap[slug] || 'Component Documentation'
</script>

<template>
  <div class="docs-page">
    <aside class="sidebar">
      <h2>UI Components</h2>
      <nav>
        <NuxtLink to="/docs/components/button">Button</NuxtLink>
        <NuxtLink to="/docs/components/card">Card</NuxtLink>
        <NuxtLink to="/docs/components/input">Input</NuxtLink>
        <NuxtLink to="/docs/components/badge">Badge</NuxtLink>
        <NuxtLink to="/docs/components/avatar">Avatar</NuxtLink>
      </nav>
    </aside>
    
    <main class="content">
      <h1>{{ title }}</h1>
      
      <section v-if="slug === 'button'" class="demo-section">
        <h2>Basic Button</h2>
        <div class="preview">
          <Button>Default Button</Button>
        </div>
        
        <h2>Button Variants</h2>
        <div class="preview">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <h2>Button Sizes</h2>
        <div class="preview">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
      </section>
      
      <section v-else-if="slug === 'card'" class="demo-section">
        <h2>Basic Card</h2>
        <div class="preview">
          <Card class="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content area.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default">Action</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section v-else-if="slug === 'input'" class="demo-section">
        <h2>Basic Input</h2>
        <div class="preview">
          <div class="form-group">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" />
          </div>
        </div>
        
        <h2>Input Types</h2>
        <div class="preview">
          <div class="form-group">
            <Label>Text Input</Label>
            <Input type="text" placeholder="Text input" />
          </div>
          
          <div class="form-group">
            <Label>Password</Label>
            <Input type="password" placeholder="Password" />
          </div>
        </div>
      </section>
      
      <section v-else-if="slug === 'badge'" class="demo-section">
        <h2>Badge Variants</h2>
        <div class="preview">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
      
      <section v-else-if="slug === 'avatar'" class="demo-section">
        <h2>Avatar Examples</h2>
        <div class="preview">
          <Avatar>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" alt="Avatar" />
          </Avatar>
          <Avatar>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" alt="Avatar" />
          </Avatar>
          <Avatar>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" alt="Avatar" />
          </Avatar>
        </div>
      </section>
      
      <section v-else>
        <p>Documentation for this component is coming soon.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.docs-page {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  padding: 2rem 1rem;
  border-right: 1px solid #e5e7eb;
  background: #f9fafb;
}

.sidebar h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar nav a {
  padding: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.sidebar nav a:hover {
  background: #e5e7eb;
  color: #111827;
}

.sidebar nav a.router-link-active {
  background: #3b82f6;
  color: white;
}

.content {
  padding: 2rem;
  max-width: 1200px;
}

.content h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #111827;
}

.demo-section {
  margin-bottom: 3rem;
}

.demo-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
}

.preview {
  padding: 2rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
}

@media (max-width: 768px) {
  .docs-page {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
}
</style>