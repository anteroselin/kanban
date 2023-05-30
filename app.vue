<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.tasks-enter-from {
  opacity: 0;
  transform: scale(0.75);
}
.tasks-enter-to {
  opacity: 1;
  transform: scale(1);
}
.tasks-enter-active {
  transition: all 0.5s ease;
}
</style>