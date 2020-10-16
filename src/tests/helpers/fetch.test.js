import "@testing-library/jest-dom";
import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe("Pruebas en el helper Fetch", () => {
  let token = "";
  test("fetchSinToken debe de funcionar", async () => {
    const res = await fetchWithoutToken(
      "auth",
      { email: "johnnyleiva.jl@gmail.com", password: "123456" },
      "POST"
    );
    expect(res instanceof Response).toBe(true);
    const { ok, token: tokenRes } = await res.json();
    expect(ok).toBe(true);
    token = tokenRes;
  });

  test("fetchSinToken debe de funcionar", async () => {
    localStorage.setItem("token", token);
    const resp = await fetchWithToken(
      "events/5f814d441803ac330c4241d3",
      {},
      "DELETE"
    );
    const { ok, msg } = await resp.json();
    expect(ok).toBe(false);
    expect(msg).toBe("El evento no existe");
  });
});
