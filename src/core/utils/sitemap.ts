import { BASE_URL, siteRoutes } from '../../config/routes';
import { fetchCoreUnits } from '../../stories/containers/CUTable/cuTableAPI';
import type { CoreUnitDto } from '../models/dto/coreUnitDTO';

export class SitemapBuilder {
  private getXMLForRoute(url: string, lastMod?: string, changeFreq?: string): string {
    return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastMod || new Date().toISOString()}</lastmod>
        <changefreq>${changeFreq || 'weekly'}</changefreq>
        <priority>1.0</priority>
      </url>
    `;
  }

  resolveHomePageRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}`);
  }

  resolveCoreUnitsHomeRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}${siteRoutes.coreUnitsOverview}`);
  }

  resolveDelegatesRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}${siteRoutes.recognizedDelegate}`);
  }

  resolveDelegatesReportsRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}${siteRoutes.recognizedDelegateReport}`);
  }

  resolveGlobalActivityRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}${siteRoutes.globalActivityFeed}`);
  }

  private resolveSingleCURoutes(cu: CoreUnitDto): string[] {
    const cuRoutes: string[] = [];
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.coreUnitAbout(cu.shortCode)}`));
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.coreUnitReports(cu.shortCode)}`));
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.coreUnitActivityFeed(cu.shortCode)}`));

    return cuRoutes;
  }

  async resolveCuRoutes(): Promise<string[]> {
    const cuRoutes: string[] = [];
    const coreUnits = (await fetchCoreUnits()) as CoreUnitDto[];
    for (const cu of coreUnits) {
      cuRoutes.push(...this.resolveSingleCURoutes(cu));
    }

    return cuRoutes;
  }

  async build(): Promise<string> {
    const cuRoutes = await this.resolveCuRoutes();

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${this.resolveHomePageRoute()}
      ${this.resolveDelegatesRoute()}
      ${this.resolveDelegatesReportsRoute()}
      ${this.resolveCoreUnitsHomeRoute()}
      ${this.resolveGlobalActivityRoute()}
      ${cuRoutes.join('')}
    </urlset>
    `;
  }
}
