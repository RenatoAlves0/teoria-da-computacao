<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100004274286167&ref=bookmarks"
              target="_blank"
            >By: Renato Alves de Oliveira</a>
          </li>
          <li>
            <a href="https://github.com/RenatoAlves0" target="_blank">GitHub</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
