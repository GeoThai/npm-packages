import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** Installs the packed tarball in a temp app and loads it with Node, by import and by require. */
import { $ } from 'bun';

const dir = await mkdtemp(join(tmpdir(), 'geothai-pack-'));
try {
  const tarball = (await $`npm pack --silent --pack-destination ${dir}`.text()).trim();
  await Bun.write(join(dir, 'package.json'), '{ "private": true }\n');
  await $`npm install --silent --no-audit --no-fund ${join(dir, tarball)}`.cwd(dir);

  const check = `if (province('84')?.name_en !== 'Surat Thani') throw new Error('wrong province');`;
  await Bun.write(join(dir, 'esm.mjs'), `import { province } from 'geothai';\n${check}\n`);
  await Bun.write(join(dir, 'cjs.cjs'), `const { province } = require('geothai');\n${check}\n`);
  await $`node esm.mjs`.cwd(dir);
  await $`node cjs.cjs`.cwd(dir);
  const node = (await $`node --version`.text()).trim();
  console.log(`${tarball}: import and require work on Node ${node}`);
} finally {
  await rm(dir, { recursive: true, force: true });
}
