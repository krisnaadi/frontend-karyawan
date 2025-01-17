<template>
  <div class="container flex flex-col mx-auto bg-white">
    <DrawerMenu />
  </div>
  <div class="flex flex-wrap ml-9 my-5">
    <div class="w-full max-w-full sm:w-1/4 mx-auto text-center">
      <slot/>
    </div>
  </div>
</template>
