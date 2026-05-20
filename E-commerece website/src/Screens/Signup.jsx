const signup = async () => {
  if (!checkValidation()) return;

  setIsLoading(true);

  try {
    const url = isSignup ? signupUrl : loginUrl;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
      credentials: "include",
    });

    const jsonData = await response.json();
    console.log("API Response:", jsonData);

    // ❌ handle backend failure
    if (!response.ok) {
      setError({
        error: jsonData?.error || "Something went wrong",
      });
      return;
    }

    // ❌ backend returned error
    if (jsonData?.error) {
      setError({
        error: jsonData.error,
      });
      return;
    }

    // ✅ success case
    if (jsonData?.res) {
      dispatch(setUser(jsonData.res));
      navigate("/");
    } else {
      setError({
        error: "Invalid server response",
      });
    }

    // reset form
    setFormState({
      name: "",
      email: "",
      password: "",
    });

    setError({
      emailError: null,
      passwordError: null,
      error: null,
    });
  } catch (err) {
    console.log("Signup Error:", err);
    setError({
      error: "Network error. Please try again.",
    });
  } finally {
    setIsLoading(false);

    setTimeout(() => {
      setError({
        emailError: null,
        passwordError: null,
        error: null,
      });
    }, 3000);
  }
};