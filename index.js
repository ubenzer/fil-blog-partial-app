import {cachePath, deployConfig, outPath, templatePath} from '../config'
import {aboutMePageHandler} from './routes/page/aboutMe'
import {binaryPassthroughHandler} from './routes/postAttachmentPassthroughHandler'
import {chokidar$} from './utils/chokidar'
import {file} from './contentTypes/binary/file'
import {hashOf} from './utils/hash'
import {image} from './contentTypes/binary/image'
import {js} from './contentTypes/templateItems/js'
import {post} from './contentTypes/post/post'
import {postCollection} from './contentTypes/post/postCollection'
import {recentPostsCollectionHandler} from './routes/recentPostsCollectionHandler'
import {scaledImage} from './contentTypes/binary/scaledImage'
import {singlePostHandler} from './routes/singlePostHandler'
import {sitemap} from './contentTypes/sitemap'
import {sitemapHandler} from './routes/sitemapHandler'
import {staticAssetHandler} from './routes/staticAssetHandler'
import {staticAssetsCollection} from './contentTypes/staticAssetsCollection'
import {stylus} from './contentTypes/templateItems/stylus'
import {templateJsHandler} from './routes/template/jsHandler'
import {templateStylusHandler} from './routes/template/stylusHandler'

// noinspection JSUnusedGlobalSymbols
const project = {
  cachePath: () => cachePath,
  contentTypes: () => ({
    file,
    image,
    js,
    post,
    postCollection,
    scaledImage,
    sitemap,
    staticAssetsCollection,
    stylus
  }),
  async contentVersion() {
    return hashOf({p: '.'})
  },
  deployConfig: () => deployConfig,
  outPath: () => outPath,
  routeHandlers: () => ({
    aboutMePageHandler,
    binaryPassthroughHandler,
    recentPostsCollectionHandler,
    singlePostHandler,
    sitemapHandler,
    staticAssetHandler,
    templateJsHandler,
    templateStylusHandler
  }),
  // Observable for changes that doesn't belong to any content (such as templates)
  watcher$: () =>
    chokidar$([
      `${templatePath}/**/*.js`,
      'config.js'
    ], {ignoreInitial: true})
}

export {project}

export default project
