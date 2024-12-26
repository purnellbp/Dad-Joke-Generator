import { storage } from './storage';

async function testRedis() {
  try {
    // Test setting a value
    await storage.set('test-key', 'test-value');
    console.log('✅ Successfully set test value');

    // Test getting the value
    const value = await storage.get('test-key');
    console.log('Retrieved value:', value);

    // Test incrementing
    await storage.set('counter', 0);
    await storage.incr('counter');
    const counter = await storage.get('counter');
    console.log('Counter value:', counter);

    // Test deletion
    await storage.del('test-key');
    const deletedValue = await storage.get('test-key');
    console.log('Deleted value (should be null):', deletedValue);

  } catch (error) {
    console.error('❌ Redis test failed:', error);
  }
}

testRedis(); 