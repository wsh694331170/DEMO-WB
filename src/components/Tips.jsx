import React, { useState } from "react";
import { Alert, Button, Drawer, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Info = () => {
  const [open, setOpen] = useState(false);

  const openDocument = () => {
    setOpen(true);
  };

  return (
    <>
      <span>
        本页面相关实现细节详见
        <Button type="link" onClick={openDocument}>
          页面文档
        </Button>
      </span>
      <Drawer
        title="页面文档"
        onClose={() => setOpen(false)}
        open={open}
        placement="left"
      >
        <Typography>
          <Title level={2}>项目工程的搭建</Title>

          <Paragraph>
            在本项目中，我们使用React框架搭建页面程序，以实现阻抗图的可视化。React是一款流行的JavaScript库，专门用于构建用户界面，具有高效的虚拟DOM和组件化开发的优势。为了提升页面的美观度和一致性，我们引入了Ant
            Design组件库（antdesign），提供了标准化的样式风格和丰富的UI组件。
          </Paragraph>

          <Title level={2}>数据可视化组件的选用与优化</Title>

          <Paragraph>
            由于阻抗图的数据量级较大，初期我们尝试使用Ant Design
            Charts进行图表绘制。然而，在处理大量数据时，Ant Design
            Charts出现了渲染卡顿的情况，导致用户体验不佳。为了解决这一问题，我们采用了异步渲染和requestAnimationFrame进行优化。异步渲染可以将数据的加载和渲染过程拆分为多个小任务，而requestAnimationFrame则用于在下一次重绘之前执行特定的代码，确保页面保持流畅。然而，尽管进行了这些优化，等待时间仍然过长。
          </Paragraph>
          <Paragraph>
            为了进一步提升渲染性能，我们最终选择了支持WebGL的图表库ECharts。WebGL是一种基于浏览器的图形渲染技术，可以利用GPU的强大计算能力进行高效的图形绘制。ECharts在支持WebGL渲染方面表现出色，能够显著提升大数据量图表的渲染速度和性能。由于Ant
            Design
            Charts不支持WebGL，因此我们决定改用ECharts来实现阻抗图的绘制。
          </Paragraph>
          <Title level={2}>文件下载与保存</Title>
          <Paragraph>
            在实现图表的可视化后，我们还需要提供图表数据的下载和保存功能。为此，我们使用了file-saver库实现文件的下载功能。file-saver是一个简单而强大的工具，可以轻松地将Blob对象保存为文件，从而允许用户下载图表数据。
          </Paragraph>
          <Paragraph>
            此外，我们还使用了html-to-image库将图表的DOM节点转化为图片保存。html-to-image可以将任意DOM节点转换为图片格式，使得用户可以方便地保存图表的截图。在文件命名方面，我们引入了nanoid库，生成具有随机命名的文件，以避免文件名重复的问题。
          </Paragraph>
          <Title level={2}>桌面应用的打包与分发</Title>
          <Paragraph>
            为了让程序可以作为桌面应用使用，我们集成了Electron对项目进行打包分发。Electron是一款基于Node.js和Chromium的开源框架，能够将Web应用打包成跨平台的桌面应用程序。通过使用Electron，我们可以轻松地将React项目打包为Windows、macOS和Linux平台上的独立应用程序，方便用户在不同操作系统上运行和使用。
          </Paragraph>
          <Title level={2}>静态资源的发布</Title>
          <Paragraph>
            为了使程序可以通过浏览器访问，我们使用了Surge对React打包后的静态资源进行发布。Surge是一款简单易用的静态网站托管服务，能够快速地将本地的静态资源发布到互联网上。通过Surge，我们生成了一个临时链接，使得用户可以在任何设备上通过浏览器访问我们的阻抗图可视化页面。
          </Paragraph>
          <Title level={2}>小结</Title>
          <Paragraph>
            本章详细介绍了阻抗图可视化页面程序的实现过程。从项目工程的搭建到数据可视化组件的选用与优化，再到文件下载与保存功能的实现，以及桌面应用的打包与分发，最后到静态资源的发布，我们通过一系列技术手段，成功实现了一个功能完善、性能优越的阻抗图可视化工具。通过本项目的实践，我们不仅掌握了React、Ant
            Design、ECharts、Electron等技术的使用方法，还积累了丰富的前端开发和性能优化经验。
          </Paragraph>
        </Typography>
      </Drawer>
    </>
  );
};

const Tips = () => {
  return <Alert message={<Info />} closable type="success" />;
};

export default Tips;
