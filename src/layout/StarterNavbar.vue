<template>
  <navbar position="fixed" type="primary" menu-classes="ml-auto">
    <!-- <template slot-scope="{ toggle, isToggled }">
      <router-link v-popover:popover1 class="navbar-brand" to="/presentation">
        My Site Name
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div>
      </el-popover>
    </template>-->
    <template slot="navbar-menu">
      <drop-down tag="li" title=" Recursos" icon="now-ui-icons education_paper" class="nav-item">
        <nav-link to="/">AFD</nav-link>
        <nav-link to="/afn">AFN</nav-link>
        <!-- <nav-link to="/afne">AFN-ε</nav-link> -->
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";

export default {
  name: "main-navbar",
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover,
  },
};
</script>

<style scoped></style>
