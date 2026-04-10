const nav = `
<nav>
  <a class="nav-logo" href="index.html">
  <img src="img/logo/logo.png" alt="WAILS 2026" style="height:52px;">
  </a>
  <ul class="nav-links">
    <li><a href="index.html#about">About</a></li>
    <li><a href="cfp.html">Call for Papers</a></li>
    <li><a href="index.html#keynotes">Keynotes</a></li>
    <li><a href="speakers.html">Speakers</a></li>
    <li><a href="committee.html">Committee</a></li>
    <li class="has-dropdown">
      <a href="#">Attend</a>
      <div class="dropdown"><div class="dropdown-inner">
        <a href="attend-registration.html">Registration</a>
        <a href="attend-travel.html">Travel Information</a>
      </div></div>
    </li>
    <li class="has-dropdown">
      <a href="#">Schedule</a>
      <div class="dropdown"><div class="dropdown-inner">
        <a href="schedule-programme.html">Programme</a>
        <a href="schedule-accepted-papers.html">Accepted Papers</a>
      </div></div>
    </li>
    <li><a href="cfp.html" class="nav-cta">Submit</a></li>
  </ul>
</nav>`;

document.body.insertAdjacentHTML("afterbegin", nav);