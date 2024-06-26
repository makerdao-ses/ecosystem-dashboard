import { fetchCoreUnits } from '@/views/CoreUnits/cuTableAPI';
import { fetchActors } from '@/views/EcosystemActorsIndexView/api/queries';
import { BASE_URL, siteRoutes } from '../../config/routes';
import { ResourceType } from '../models/interfaces/types';
import type { CoreUnitDto } from '../models/dto/coreUnitDTO';
import type { Team } from '../models/interfaces/team';

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

  resolveEndgameRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}${siteRoutes.endgame}`);
  }

  resolveGlobalActivityRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}${siteRoutes.globalActivityFeed}`);
  }

  resolveActorsOverviewRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}${siteRoutes.ecosystemActors}`);
  }

  private resolveSingleCURoutes(cu: CoreUnitDto): string[] {
    const cuRoutes: string[] = [];
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.coreUnitAbout(cu.shortCode)}`));
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.coreUnitReports(cu.shortCode)}`));
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.coreUnitActivityFeed(cu.shortCode)}`));

    return cuRoutes;
  }

  private resolveSingleActorRoutes(actor: Team): string[] {
    const actorRoutes: string[] = [];
    actorRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.ecosystemActorAbout(actor.shortCode)}`));
    actorRoutes.push(this.getXMLForRoute(`${BASE_URL}${siteRoutes.ecosystemActorReports(actor.shortCode)}`));
    return actorRoutes;
  }

  async resolveCuRoutes(): Promise<string[]> {
    const cuRoutes: string[] = [];
    const coreUnits = (await fetchCoreUnits()) as CoreUnitDto[];
    for (const cu of coreUnits) {
      cuRoutes.push(...this.resolveSingleCURoutes(cu));
    }

    return cuRoutes;
  }

  async resolveActorsRoutes(): Promise<string[]> {
    const actorRoutes: string[] = [];
    const actors = (await fetchActors(ResourceType.EcosystemActor)) as Team[];
    for (const cu of actors) {
      actorRoutes.push(...this.resolveSingleActorRoutes(cu));
    }

    return actorRoutes;
  }

  async build(): Promise<string> {
    const cuRoutes = await this.resolveCuRoutes();
    const actors = await this.resolveActorsRoutes();

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${this.resolveHomePageRoute()}
      ${this.resolveDelegatesRoute()}
      ${this.resolveDelegatesReportsRoute()}
      ${this.resolveEndgameRoute()}
      ${this.resolveCoreUnitsHomeRoute()}
      ${this.resolveGlobalActivityRoute()}
      ${this.resolveActorsOverviewRoute()}
      ${cuRoutes.join('')}
      ${actors.join('')}

    </urlset>
    `;
  }
}
