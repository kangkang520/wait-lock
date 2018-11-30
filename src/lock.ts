//锁列表
const locks: { [key: string]: Array<() => void> } = {}

/**
 * 检测是否正在上锁
 * @param key 锁键
 */
export function locking(key: string): boolean {
	return !!locks[key]
}

/**
 * 加锁
 * @param key 锁键
 */
export function lock(key: string) {
	//如果没有锁则退出
	if (locking(key)) return
	//加入锁
	locks[key] = []
}

/**
 * 解锁
 * @param key 锁键
 */
export function unlock(key: string) {
	//取出锁，如果没有锁则退出
	const lock = locks[key]
	if (!lock) return
	//取出回调函数并删除锁
	const cbs = locks[key]
	delete locks[key]
	//回调函数调用
	cbs.forEach(cb => cb())
}

/**
 * 等待解锁
 * @param key 锁键
 */
export async function wait(key: string): Promise<void> {
	//无锁不处理
	if (!locks[key]) return
	//加入监听
	return new Promise<void>(resolve => locks[key].push(resolve))
}