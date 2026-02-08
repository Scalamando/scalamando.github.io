{
  pkgs,
  inputs,
  ...
}: {
  languages.javascript = {
    enable = true;
    package = inputs.tools.packages.${pkgs.stdenv.hostPlatform.system}.nodejs;
    corepack.enable = true;
  };
}
