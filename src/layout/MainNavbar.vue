<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <a v-popover:popover1 class="navbar-brand" to="/">Teoria da Computação</a>
    </template>
    <template slot="navbar-menu">
      <drop-down tag="li" title=" Recursos" icon="now-ui-icons education_paper" class="nav-item">
        <nav-link to="/">AFD</nav-link>
        <nav-link to="/afn">AFN</nav-link>
        <nav-link to="/afntoafd">AFN para AFD</nav-link>
        <!-- <nav-link to="/afne">AFN-ε</nav-link> -->
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover,
  },
};
</script>

<style scoped></style>
