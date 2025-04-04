
import React from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppTopbar from '@/components/layout/AppTopbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePreferences } from '@/hooks/use-preferences';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';
import { ALargeSmall, Image } from 'lucide-react';

const Profile = () => {
  const { preferences, updatePreferences } = usePreferences();
  
  return (
    <div className="flex h-screen bg-gray-50/70 backdrop-blur-sm overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar title="Profil & Préférences" />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Préférences d'affichage</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence et le comportement de l'application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="text-base">Taille de police</Label>
                    <ALargeSmall className="text-muted-foreground h-5 w-5" />
                  </div>
                  <ToggleGroup 
                    type="single" 
                    value={preferences.fontSize}
                    onValueChange={(value) => {
                      if (value) updatePreferences({ fontSize: value as 'small' | 'medium' | 'large' });
                    }}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="small" aria-label="Small text">
                      <span className="text-sm">A</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="medium" aria-label="Medium text">
                      <span className="text-base">A</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="large" aria-label="Large text">
                      <span className="text-lg">A</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="show-logo" className="text-base">Afficher le logo</Label>
                    <p className="text-sm text-muted-foreground">
                      Affiche le logo de l'entreprise dans la barre latérale
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image className="text-muted-foreground h-5 w-5" />
                    <Switch
                      id="show-logo"
                      checked={preferences.showLogo}
                      onCheckedChange={(checked) => updatePreferences({ showLogo: checked })}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="compact-view" className="text-base">Vue compacte</Label>
                    <p className="text-sm text-muted-foreground">
                      Réduit l'espacement et affiche plus de contenu à l'écran
                    </p>
                  </div>
                  <Switch
                    id="compact-view"
                    checked={preferences.compactView}
                    onCheckedChange={(checked) => updatePreferences({ compactView: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
