/* import View from "./View";
import ViewManager from "../ViewManager";
import Vector from "../../Helpers/Vector";

class PhysicsView extends View {
    protected world: World | undefined;//мир
    protected hiddenBody: Body | undefined;
    protected fixedMouseJoint: FixedMouseJoint | undefined;

    private agentForce = 0;//сила приложенная к агенту
    private agentTorque = 0;//вращающий момент агента
    private userAgent: Body | undefined;//тело юзера

    constructor(viewManager: ViewManager) {
        super(viewManager);
    }

    protected setUserAgent(agent: Body, force: number, torque: number): void {
        this.userAgent = agent;
        this.agentForce = force;
        this.agentTorque = torque;
    }

    public loadContent(): void {
        super.loadContent();

        if (this.world === undefined) {
            this.world = new World(Vector.zero);
            this.world.jointRemoved += this.jointRemoved;
        }
        else {
            this.world.clear();
        }

        this.hiddenBody = this.world.createBody(Vector.zero);
    }

    protected jointRemoved(sender: World, joint: Joint): void {
        if (this.fixedMouseJoint == joint)
            this.fixedMouseJoint = undefined;
    }

    public update(gameTime: DOMHighResTimeStamp, coveredByOtherScreen: boolean): void {
        if (!coveredByOtherScreen) {
            // variable time step but never less then 30 Hz
            this.world.step(Math.min(gameTime, (1 / 30)));
        }

        super.update(gameTime, coveredByOtherScreen);
    }

    public draw(gameTime: DOMHighResTimeStamp): void {
        super.draw(gameTime);
    }
}

export default PhysicsView;
 */