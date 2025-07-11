document.addEventListener("DOMContentLoaded", () => {
  // add step 1 to the url hash
  window.history.replaceState({}, "", "#1");

  const messenger = new window.Penpal.WindowMessenger({
    remoteWindow: window.parent,
  });

  const connection = window.Penpal.connect({
    messenger,
  });

  const resizeObserver = new ResizeObserver(async (entries) => {
    for (const entry of entries) {
      const { height } = entry.target.getBoundingClientRect();
      const remote = await connection.promise;
      remote.updateContainerDims({ height });
    }
  });
  resizeObserver.observe(document.body);

  const nextButton = document.getElementById("next-button");

  /*
    Push an entry onto history
    - first read the current step number from the url hash
    - increment the step number in hash and push it to history
  */
  nextButton?.addEventListener("click", () => {
    const currentStep = window.location.hash.split("#")[1];
    const nextStep = currentStep ? parseInt(currentStep) + 1 : 1;
    window.location.hash = `#${nextStep}`;
  });

  /*
    Use the history API to listen for hash changes
    -update the iframe title with the step number
  */
  window.addEventListener("hashchange", () => {
    console.log("hashchange");
    const currentStep = window.location.hash.split("#")[1];
    const title = document.querySelector("h1");
    title.textContent = `Step ${currentStep}`;
  });
});
