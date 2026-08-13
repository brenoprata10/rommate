How to setup locally

Set romm folder as submodule

git submodule update --init --recursive
git -C romm sparse-checkout init --cone
git -C romm sparse-checkout set frontend

Update submodule
git submodule update --init --remote romm
