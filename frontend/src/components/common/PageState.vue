<template>
  <div :class="['page-state', `page-state--${state}`]" role="status" :aria-live="state === 'loading' ? 'polite' : 'assertive'">
    <!-- 加载状态 -->
    <div v-if="state === 'loading'" class="page-state__loading">
      <div class="page-state__spinner" aria-hidden="true"></div>
      <p class="page-state__message">内容加载中，请稍候…</p>
    </div>

    <!-- 空状态 -->
    <div v-else-if="state === 'empty'" class="page-state__empty">
      <p class="page-state__message">暂无内容，敬请期待。</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="state === 'error'" class="page-state__error">
      <p class="page-state__message">内容加载失败，请稍后重试。</p>
      <button
        v-if="$listeners && $listeners.retry"
        class="page-state__retry-btn"
        type="button"
        @click="$emit('retry')"
      >
        重新加载
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageState',

  props: {
    state: {
      type: String,
      required: true,
      validator: value => ['loading', 'empty', 'error'].includes(value)
    }
  }
}
</script>

<style scoped>
.page-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: var(--space-12) var(--space-6);
  text-align: center;
}

.page-state__loading,
.page-state__empty,
.page-state__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

/* 加载旋转器 */
.page-state__spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.page-state__message {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
}

/* 重试按钮 */
.page-state__retry-btn {
  margin-top: var(--space-2);
  padding: var(--space-2) var(--space-6);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.page-state__retry-btn:hover {
  background-color: var(--color-primary-dark);
}

.page-state__retry-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
