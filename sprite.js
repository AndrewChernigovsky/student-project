import fs from 'fs';
import path from 'path';
import SVGSpriter from 'svg-sprite';

const config = {
  mode: {
    stack: {
      sprite: 'sprite.svg',
    }
  },
  shape: {
    dimension: {
      maxWidth: 40,
      maxHeight: 40
    },
    spacing: {
      padding: 10
    }
  },
  svg: {
    xmlDeclaration: true,
    doctypeDeclaration: true
  }
};

const spriter = new SVGSpriter(config);

const svgFolder = path.join(process.cwd(), 'src/icons');
console.log('Путь к папке со SVG файлами:', svgFolder);

const createSprite = async () => {
  try {
    const files = await fs.promises.readdir(svgFolder);
    console.log('Найденные SVG файлы:', files);

    for (const file of files) {
      if (path.extname(file) === '.svg') {
        const filePath = path.join(svgFolder, file);
        console.log(`Обработка файла: ${filePath}`);

        try {
          const svgContent = await fs.promises.readFile(filePath, 'utf-8');
          spriter.add(filePath, null, svgContent);
          console.log(`Добавлен файл в спрайт: ${filePath}`);
        } catch (readError) {
          console.error(`Ошибка при чтении файла ${filePath}:`, readError);
        }
      }
    }

    spriter.compile((error, result) => {
      if (error) {
        console.error('Ошибка при создании спрайта:', error);
        return;
      }

      for (const mode in result) {
        for (const resource in result[mode]) {
          const outputPath = path.join(process.cwd(), 'public/assets/vectors/', path.basename(result[mode][resource].path));
          fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
            .then(() => fs.promises.writeFile(outputPath, result[mode][resource].contents))
            .then(() => console.log(`Создан файл: ${outputPath}`))
            .catch(err => console.error('Ошибка при записи файла:', err));
        }
      }
    });
  } catch (err) {
    console.error('Ошибка при чтении директории:', err);
  }
};

createSprite();
