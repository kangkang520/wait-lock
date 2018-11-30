# wait-lock

简单的锁操作

# 安装
```
npm install wait-lock
```

# 使用
当数据锁定后，使用wait函数等待解锁，解锁后后可以继续进行
```typescript
import lock from 'wait-lock'

async function test() {
	//define a lock key
	const key = 'test-lock'
	//lock and unlock after 5 seconds
	lock.lock(key)
	setTimeout(() => lock.unlock(key), 5000)
	//test
	console.log('waiting ...')
	await lock.wait(key)
	console.log('unlocked')		//print after 5 seconds
}
test()
```